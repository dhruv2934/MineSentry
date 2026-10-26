from typing import TypedDict, Any


class MineSentryState(TypedDict, total=False):

    # Observation
    observation_id: int
    observation_text: str
    severity: str | None
    observed_at: Any

    # AI-extracted facts
    title: str
    category: str
    affected_workers: int
    location: str | None
    description: str | None

    # Regulation analysis
    regulations: list[dict]
    regulation_support: bool

    # Violation decision
    is_violation: bool
    matched_regulation_number: int | None
    violation_reason: str

    # Created violation
    violation_id: int

    # Risk
    risk_score: int
    risk_level: str
    risk_factors: dict
    recurrence_count: int 
    historical_violation_count: int 


    # Corrective action recommendation
    recommendation_id: int
    recommended_action_title: str
    recommended_action_description: str
    recommended_deadline_days: int
    recommendation_reason: str

    # Human approval
    approved: bool
    assigned_to: str | None
    approved_due_date: Any | None