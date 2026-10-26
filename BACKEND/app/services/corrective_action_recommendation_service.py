from datetime import datetime

from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.corrective_action_recommendation import (
    CorrectiveActionRecommendation
)
from app.models.violation import Violation

from app.schemas.corrective_action_recommendation import (
    CorrectiveActionRecommendationCreate
)

from app.schemas.corrective_action import (
    CorrectiveActionCreate
)

from app.services import corrective_action_service


def create_recommendation(
    db: Session,
    recommendation_data: CorrectiveActionRecommendationCreate
):
    violation = (
        db.query(Violation)
        .filter(
            Violation.id
            == recommendation_data.violation_id
        )
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    recommendation = CorrectiveActionRecommendation(
        violation_id=recommendation_data.violation_id,
        title=recommendation_data.title,
        description=recommendation_data.description,
        recommended_deadline_days=(
            recommendation_data.recommended_deadline_days
        ),
        reason=recommendation_data.reason
    )

    db.add(recommendation)
    db.commit()
    db.refresh(recommendation)

    return recommendation


def get_pending_recommendations(
    db: Session
):
    return (
        db.query(CorrectiveActionRecommendation)
        .filter(
            CorrectiveActionRecommendation.status
            == "pending"
        )
        .all()
    )


def get_recommendation(
    db: Session,
    recommendation_id: int
):
    recommendation = (
        db.query(CorrectiveActionRecommendation)
        .filter(
            CorrectiveActionRecommendation.id
            == recommendation_id
        )
        .first()
    )

    if not recommendation:
        raise HTTPException(
            status_code=404,
            detail="Recommendation not found"
        )

    return recommendation


def approve_recommendation(
    db: Session,
    recommendation_id: int,
    assigned_to: str,
    due_date: datetime,
    reviewed_by: str
):
    recommendation = get_recommendation(
        db=db,
        recommendation_id=recommendation_id
    )

    if recommendation.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Recommendation is not pending"
        )

    action_data = CorrectiveActionCreate(
        violation_id=recommendation.violation_id,
        title=recommendation.title,
        description=recommendation.description,
        assigned_to=assigned_to,
        due_date=due_date
    )

    corrective_action = (
        corrective_action_service.create_corrective_action(
            db=db,
            action_data=action_data
        )
    )

    recommendation.status = "approved"
    recommendation.reviewed_by = reviewed_by
    recommendation.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(recommendation)

    return {
        "recommendation": recommendation,
        "corrective_action": corrective_action
    }


def reject_recommendation(
    db: Session,
    recommendation_id: int,
    reviewed_by: str
):
    recommendation = get_recommendation(
        db=db,
        recommendation_id=recommendation_id
    )

    if recommendation.status != "pending":
        raise HTTPException(
            status_code=400,
            detail="Recommendation is not pending"
        )

    recommendation.status = "rejected"
    recommendation.reviewed_by = reviewed_by
    recommendation.reviewed_at = datetime.utcnow()

    db.commit()
    db.refresh(recommendation)

    return recommendation                              