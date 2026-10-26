from datetime import datetime

from pydantic import BaseModel, ConfigDict


class CorrectiveActionRecommendationCreate(BaseModel):
    violation_id: int
    title: str
    description: str
    recommended_deadline_days: int
    reason: str | None = None


class CorrectiveActionRecommendationResponse(BaseModel):
    id: int
    violation_id: int
    title: str
    description: str
    recommended_deadline_days: int
    reason: str | None
    status: str
    reviewed_by: str | None
    reviewed_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )