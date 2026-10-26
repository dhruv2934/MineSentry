from pydantic import BaseModel


class ViolationEvaluation(BaseModel):
    is_violation: bool
    matched_regulation_number: int | None = None
    reason: str