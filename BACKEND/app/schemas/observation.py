from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ObservationCreate(BaseModel):
    inspection_id: int
    observation_text: str
    observed_at: datetime
    location: str | None = None
    severity: str | None = None
    evidence_url: str | None = None


class ObservationUpdate(BaseModel):
    observation_text: str | None = None
    observed_at: datetime | None = None
    location: str | None = None
    severity: str | None = None
    evidence_url: str | None = None


class ObservationResponse(BaseModel):
    id: int
    inspection_id: int
    observation_text: str
    observed_at: datetime
    location: str | None
    severity: str | None
    evidence_url: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )