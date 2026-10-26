from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CorrectiveActionCreate(BaseModel):
    violation_id: int
    title: str
    description: str | None = None
    assigned_to: str | None = None
    due_date: datetime | None = None


class CorrectiveActionUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    assigned_to: str | None = None
    due_date: datetime | None = None
    status: str | None = None
    completed_at: datetime | None = None
    completion_notes: str | None = None


class CorrectiveActionResponse(BaseModel):
    id: int
    violation_id: int
    title: str
    description: str | None
    assigned_to: str | None
    due_date: datetime | None
    status: str
    completed_at: datetime | None
    completion_notes: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )