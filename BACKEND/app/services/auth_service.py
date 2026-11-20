
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.employee import Employee
from app.models.user_account import UserAccount
from app.schemas.auth import LoginRequest, LoginResponse
from app.core.security import verify_password, create_access_token


def login_employee(
    db: Session,
    login_data: LoginRequest
) -> LoginResponse:

    # Find the employee and their associated account
    result = (
        db.query(Employee, UserAccount)
        .join(
            UserAccount,
            UserAccount.employee_id == Employee.id
        )
        .filter(
            Employee.code == login_data.employee_code
        )
        .first()
    )

    # Return the same error for invalid credentials
    # and unavailable accounts
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid employee code or password",
        headers={"WWW-Authenticate": "Bearer"}
    )

    if result is None:
        raise credentials_exception

    employee, account = result

    # Check employee and account status
    if employee.status != "ACTIVE" or not account.is_active:
        raise credentials_exception

    # Verify the submitted password against its stored hash
    if not verify_password(
        login_data.password,
        account.password_hash
    ):
        raise credentials_exception

    # Generate JWT using the employee's database ID
    access_token = create_access_token(
        subject=str(employee.id)
    )

    # Return token and employee information
    return LoginResponse(
        access_token=access_token,
        employee=employee
    )
