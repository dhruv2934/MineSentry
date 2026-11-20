
from typing import Callable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jwt.exceptions import InvalidTokenError

from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.employee import Employee
from app.models.user_account import UserAccount


# -----------------------------------
# JWT BEARER TOKEN EXTRACTION
# -----------------------------------

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/token"
)


# -----------------------------------
# AUTHENTICATION
# Identify the currently logged-in employee
# -----------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Employee:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )

    try:
        # Decode and validate JWT
        payload = decode_access_token(token)

        # Extract employee ID from JWT subject
        employee_id = int(payload["sub"])

    except (
        InvalidTokenError,
        ValueError,
        TypeError,
        KeyError
    ):
        raise credentials_exception

    # Find employee and verify account status
    employee = (
        db.query(Employee)
        .join(
            UserAccount,
            UserAccount.employee_id == Employee.id
        )
        .filter(
            Employee.id == employee_id,
            Employee.status == "ACTIVE",
            UserAccount.is_active.is_(True)
        )
        .first()
    )

    if employee is None:
        raise credentials_exception

    return employee


# -----------------------------------
# AUTHORIZATION
# Check whether the employee has an allowed role
# -----------------------------------

def require_roles(*allowed_roles: str) -> Callable:

    def role_checker(
        current_user: Employee = Depends(get_current_user)
    ) -> Employee:

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action"
            )

        return current_user

    return role_checker
