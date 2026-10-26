from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AlertCreate(BaseModel):
    corrective_action_id: int
    alert_type: str
    message: str
    recipient: str | None = None
    triggered_at: datetime


class AlertUpdate(BaseModel):
    status: str | None = None
    recipient: str | None = None
    message: str | None = None
    resolved_at: datetime | None = None


class AlertResponse(BaseModel):
    id: int
    corrective_action_id: int
    alert_type: str
    message: str
    recipient: str | None
    status: str
    triggered_at: datetime
    resolved_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

    