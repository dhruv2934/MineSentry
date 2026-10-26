from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.risk.risk_service import calculate_violation_risk
from app.schemas.risk import RiskResponse


router = APIRouter(
    prefix="/violations",
    tags=["Risk"]
)


@router.get(
    "/{violation_id}/risk",
    response_model=RiskResponse
)
def get_violation_risk(
    violation_id: int,
    db: Session = Depends(get_db)
):
    result = calculate_violation_risk(
        db=db,
        violation_id=violation_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    return result