from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.dependencies import require_roles
from app.models.employee import Employee

from app.schemas.employee import (
    EmployeeCreate,
    EmployeeResponse,
    EmployeeUpdate
)

from app.services.employee_service import (
    create_employee,
    get_employees,
    get_employee,
    update_employee,
    deactivate_employee,
    activate_employee
)


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# Create employee and associated UserAccount
@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED
)
def create_employee_endpoint(
    employee_data: EmployeeCreate,
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return create_employee(db, employee_data, current_user)


# Get employees
@router.get("/", response_model=list[EmployeeResponse])
def get_employees_endpoint(
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return get_employees(db, current_user)


# Get employee by ID
@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee_endpoint(
    employee_id: int,
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return get_employee(db, employee_id, current_user)


# Update employee
@router.patch("/{employee_id}", response_model=EmployeeResponse)
def update_employee_endpoint(
    employee_id: int,
    employee_data: EmployeeUpdate,
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return update_employee(
        db, employee_id, employee_data, current_user
    )


# Deactivate employee
@router.delete("/{employee_id}", response_model=EmployeeResponse)
def deactivate_employee_endpoint(
    employee_id: int,
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return deactivate_employee(db, employee_id, current_user)


### ACTIVATE EMPLOYEE##########################

@router.patch("/{employee_id}/activate", response_model=EmployeeResponse)
def activate_employee_endpoint(
    employee_id: int,
    current_user: Employee = Depends(
        require_roles("ADMIN", "MANAGER")
    ),
    db: Session = Depends(get_db)
):
    return activate_employee(
        db,
        employee_id,
        current_user
    )