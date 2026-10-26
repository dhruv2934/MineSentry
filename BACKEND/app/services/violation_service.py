from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.models.violation import Violation
from app.schemas.violation import (
    ViolationCreate,
    ViolationUpdate
)


def create_violation(
    db: Session,
    violation_data: ViolationCreate
):

    observation = (
        db.query(Observation)
        .filter(
            Observation.id == violation_data.observation_id
        )
        .first()
    )

    if not observation:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    new_violation = Violation(
        observation_id=violation_data.observation_id,
        title=violation_data.title,
        description=violation_data.description,
        category=violation_data.category,
        severity=violation_data.severity,
        affected_workers=violation_data.affected_workers,
        identified_at=violation_data.identified_at
    )

    db.add(new_violation)
    db.commit()
    db.refresh(new_violation)

    return new_violation


def get_violations(db: Session):

    violations = (
        db.query(Violation)
        .all()
    )

    return violations


def get_violation(
    db: Session,
    violation_id: int
):

    violation = (
        db.query(Violation)
        .filter(
            Violation.id == violation_id
        )
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    return violation


def update_violation(
    db: Session,
    violation_id: int,
    violation_data: ViolationUpdate
):

    violation = (
        db.query(Violation)
        .filter(
            Violation.id == violation_id
        )
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    update_data = violation_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(violation, field, value)

    db.commit()
    db.refresh(violation)

    return violation