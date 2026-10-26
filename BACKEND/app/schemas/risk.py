from pydantic import BaseModel


class RiskFactors(BaseModel):
    severity: int
    recurrence: int
    affected_workers: int
    overdue_actions: int
    historical_frequency: int


class RiskResponse(BaseModel):
    score: int
    risk_level: str
    factors: RiskFactors