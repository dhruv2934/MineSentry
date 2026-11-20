
from pydantic import BaseModel, ConfigDict, SecretStr, Field, field_validator
from typing import Literal
from datetime import datetime


class EmployeeCreate(BaseModel):
    name: str
    code: str
    role: Literal["WORKER", "INSPECTOR", "MANAGER", "ADMIN"]
    mine_id: int
    initial_password: SecretStr = Field(min_length=8)

    @field_validator("initial_password")
    @classmethod
    def validate_password_length(cls, value: SecretStr):
        if len(value.get_secret_value().encode("utf-8")) > 72:
            raise ValueError("Password cannot exceed 72 UTF-8 bytes")
        return value


class EmployeeResponse(BaseModel):
    id: int
    name: str
    code: str
    role: str
    status: str
    mine_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EmployeeUpdate(BaseModel):
    name: str | None = None
    role: Literal["WORKER", "INSPECTOR", "MANAGER", "ADMIN"] | None = None
    mine_id: int | None = None
