from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.violation import Violation
from app.models.corrective_action import CorrectiveAction
from app.schemas.corrective_action import (
    CorrectiveActionCreate,
    CorrectiveActionUpdate
)


def create_corrective_action(
    db: Session,
    action_data: CorrectiveActionCreate
):

    violation = (
        db.query(Violation)
        .filter(
            Violation.id == action_data.violation_id
        )
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    new_action = CorrectiveAction(
        violation_id=action_data.violation_id,
        title=action_data.title,
        description=action_data.description,
        assigned_to=action_data.assigned_to,
        due_date=action_data.due_date
    )

    db.add(new_action)
    db.commit()
    db.refresh(new_action)

    return new_action


def get_corrective_actions(
    db: Session
):

    return (
        db.query(CorrectiveAction)
        .all()
    )


def get_corrective_action(
    db: Session,
    action_id: int
):

    action = (
        db.query(CorrectiveAction)
        .filter(
            CorrectiveAction.id == action_id
        )
        .first()
    )

    if not action:
        raise HTTPException(
            status_code=404,
            detail="Corrective action not found"
        )

    return action


def update_corrective_action(
    db: Session,
    action_id: int,
    action_data: CorrectiveActionUpdate
):

    action = (
        db.query(CorrectiveAction)
        .filter(
            CorrectiveAction.id == action_id
        )
        .first()
    )

    if not action:
        raise HTTPException(
            status_code=404,
            detail="Corrective action not found"
        )

    update_data = action_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(action, field, value)

    db.commit()
    db.refresh(action)

    return action