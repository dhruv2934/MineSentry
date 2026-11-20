from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.auth import LoginRequest, LoginResponse
from app.services.auth_service import login_employee


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# Existing JSON login endpoint (frontend)
@router.post("/login", response_model=LoginResponse)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    return login_employee(
        db=db,
        login_data=login_data
    )


# OAuth2 form login endpoint (Swagger UI)
@router.post("/token")
def issue_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    login_data = LoginRequest(
        employee_code=form_data.username,
        password=form_data.password
    )

    result = login_employee(
        db=db,
        login_data=login_data
    )

    return {
        "access_token": result.access_token,
        "token_type": "bearer"
    }