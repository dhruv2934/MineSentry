from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ViolationCreate(BaseModel):
    observation_id: int
    title: str
    description: str | None = None
    category: str | None = None
    severity: str
    affected_workers: int = 0
    identified_at: datetime


class ViolationUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category: str | None = None
    severity: str | None = None
    affected_workers: int | None = None
    status: str | None = None
    identified_at: datetime | None = None


class ViolationResponse(BaseModel):
    id: int
    observation_id: int
    title: str
    description: str | None
    category: str | None
    severity: str
    affected_workers: int
    status: str
    identified_at: datetime
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )