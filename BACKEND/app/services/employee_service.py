from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.employee import Employee
from app.models.mine import Mine
from app.models.user_account import UserAccount

from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.core.security import hash_password


MANAGEABLE_ROLES = {"WORKER", "INSPECTOR"}


def check_employee_access(
    current_user: Employee,
    target_employee: Employee
):
    # Admin can manage everyone
    if current_user.role == "ADMIN":
        return

    # Only managers can access this branch
    if current_user.role != "MANAGER":
        raise HTTPException(
            status_code=403,
            detail="Insufficient permissions"
        )

    # Manager can only access employees in their own mine
    if target_employee.mine_id != current_user.mine_id:
        raise HTTPException(
            status_code=403,
            detail="You cannot access employees from another mine"
        )

    # Manager cannot manage other managers or admins
    if target_employee.role not in MANAGEABLE_ROLES:
        raise HTTPException(
            status_code=403,
            detail="You cannot manage privileged employees"
        )


def create_employee(
    db: Session,
    employee_data: EmployeeCreate,
    current_user: Employee
):

    try:
        if current_user.role == "MANAGER":

            if employee_data.mine_id != current_user.mine_id:
                raise HTTPException(
                    status_code=403,
                    detail="You can only create employees in your own mine"
                )

            if employee_data.role not in MANAGEABLE_ROLES:
                raise HTTPException(
                    status_code=403,
                    detail="Managers can only create WORKER or INSPECTOR accounts"
                )

        existing_employee = (
            db.query(Employee)
            .filter(Employee.code == employee_data.code)
            .first()
        )

        if existing_employee:
            raise HTTPException(
                status_code=409,
                detail="Employee with this code already exists"
            )

        mine = (
            db.query(Mine)
            .filter(Mine.id == employee_data.mine_id)
            .first()
        )

        if not mine:
            raise HTTPException(
                status_code=404,
                detail="Mine not found"
            )

        new_employee = Employee(
        name=employee_data.name,
        code=employee_data.code,
        role=employee_data.role,
        mine_id=employee_data.mine_id,
        status="INACTIVE"
    )

        db.add(new_employee)
        db.flush()

        password_hash = hash_password(
            employee_data.initial_password.get_secret_value()
        )

        new_account = UserAccount(
            employee_id=new_employee.id,
            password_hash=password_hash,
            is_active=False
        )

        db.add(new_account)

        db.commit()
        db.refresh(new_employee)

        return new_employee

    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Employee code or account already exists"
        )

    except Exception:
        db.rollback()
        raise


def get_employees(
    db: Session,
    current_user: Employee
):

    query = db.query(Employee)

    if current_user.role == "MANAGER":
        query = query.filter(
            Employee.mine_id == current_user.mine_id,
            Employee.role.in_(MANAGEABLE_ROLES)
        )

    return query.all()


def get_employee(
    db: Session,
    employee_id: int,
    current_user: Employee
):

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    check_employee_access(current_user, employee)

    return employee


def update_employee(
    db: Session,
    employee_id: int,
    employee_data: EmployeeUpdate,
    current_user: Employee
):

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    check_employee_access(current_user, employee)

    update_data = employee_data.model_dump(
        exclude_unset=True,
        exclude_none=True
    )

    if current_user.role == "MANAGER":

        new_mine_id = update_data.get("mine_id")

        if (
            new_mine_id is not None
            and new_mine_id != current_user.mine_id
        ):
            raise HTTPException(
                status_code=403,
                detail="Managers cannot transfer employees to another mine"
            )

        new_role = update_data.get("role")

        if new_role is not None and new_role not in MANAGEABLE_ROLES:
            raise HTTPException(
                status_code=403,
                detail="Managers cannot assign privileged roles"
            )

    if "mine_id" in update_data:

        mine = (
            db.query(Mine)
            .filter(Mine.id == update_data["mine_id"])
            .first()
        )

        if not mine:
            raise HTTPException(
                status_code=404,
                detail="Mine not found"
            )

    for field, value in update_data.items():
        setattr(employee, field, value)

    db.commit()
    db.refresh(employee)

    return employee


def deactivate_employee(
    db: Session,
    employee_id: int,
    current_user: Employee
):

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    check_employee_access(current_user, employee)

    employee.status = "INACTIVE"

    # Also disable the associated login account
    account = (
        db.query(UserAccount)
        .filter(UserAccount.employee_id == employee.id)
        .first()
    )

    if account:
        account.is_active = False

    db.commit()
    db.refresh(employee)

    return employee


##### ACTIVATE THE EMPLOYEEE#############################

def activate_employee(
    db: Session,
    employee_id: int,
    current_user: Employee
):

    employee = (
        db.query(Employee)
        .filter(Employee.id == employee_id)
        .first()
    )

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    # Verify role and mine-level access
    check_employee_access(current_user, employee)

    account = (
        db.query(UserAccount)
        .filter(UserAccount.employee_id == employee.id)
        .first()
    )

    if not account:
        raise HTTPException(
            status_code=409,
            detail="User account not found for this employee"
        )

    try:
        employee.status = "ACTIVE"
        account.is_active = True

        db.commit()
        db.refresh(employee)

        return employee

    except Exception:
        db.rollback()
        raise