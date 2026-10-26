from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.corrective_action_recommendation import (
    CorrectiveActionRecommendationResponse
)

from app.services import corrective_action_recommendation_service


router = APIRouter(
    prefix="/recommendations",
    tags=["Corrective Action Recommendations"]
)


@router.get(
    "/pending",
    response_model=list[CorrectiveActionRecommendationResponse]
)
def get_pending_recommendations(
    db: Session = Depends(get_db)
):
    return (
        corrective_action_recommendation_service
        .get_pending_recommendations(db=db)
    )


@router.get(
    "/{recommendation_id}",
    response_model=CorrectiveActionRecommendationResponse
)
def get_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db)
):
    return (
        corrective_action_recommendation_service
        .get_recommendation(
            db=db,
            recommendation_id=recommendation_id
        )
    )


@router.post(
    "/{recommendation_id}/approve"
)
def approve_recommendation(
    recommendation_id: int,
    assigned_to: str,
    due_date: datetime,
    reviewed_by: str,
    db: Session = Depends(get_db)
):
    return (
        corrective_action_recommendation_service
        .approve_recommendation(
            db=db,
            recommendation_id=recommendation_id,
            assigned_to=assigned_to,
            due_date=due_date,
            reviewed_by=reviewed_by
        )
    )


@router.post(
    "/{recommendation_id}/reject",
    response_model=CorrectiveActionRecommendationResponse
)
def reject_recommendation(
    recommendation_id: int,
    reviewed_by: str,
    db: Session = Depends(get_db)
):
    return (
        corrective_action_recommendation_service
        .reject_recommendation(
            db=db,
            recommendation_id=recommendation_id,
            reviewed_by=reviewed_by
        )
    )