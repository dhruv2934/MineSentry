from pydantic import BaseModel, ConfigDict
from datetime import datetime


class MineCreate(BaseModel):
    name: str
    code: str
    location: str | None = None
    state: str | None = None
    district: str | None = None
    description: str | None = None


class MineResponse(BaseModel):
    id: int
    name: str
    code: str
    location: str | None
    state: str | None
    district: str | None
    description: str | None
    status: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MineUpdate(BaseModel):
    name: str | None = None
    location: str | None = None
    state: str | None = None
    district: str | None = None
    description: str | None = None
    status: str | None = None