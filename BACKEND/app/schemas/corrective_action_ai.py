from pydantic import BaseModel


class CorrectiveActionRecommendation(BaseModel):
    title: str
    description: str
    recommended_deadline_days: int
    reason: str