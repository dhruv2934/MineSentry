
from pydantic import BaseModel, Field

from app.schemas.employee import EmployeeResponse


class LoginRequest(BaseModel):
    employee_code: str = Field(min_length=1)
    password: str = Field(min_length=1)


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    employee: EmployeeResponse
