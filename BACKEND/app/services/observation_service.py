from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.inspection import Inspection
from app.models.observation import Observation
from app.schemas.observation import (
    ObservationCreate,
    ObservationUpdate
)


def create_observation(
    db: Session,
    observation_data: ObservationCreate
):

    inspection = (
        db.query(Inspection)
        .filter(
            Inspection.id == observation_data.inspection_id
        )
        .first()
    )

    if not inspection:
        raise HTTPException(
            status_code=404,
            detail="Inspection not found"
        )

    new_observation = Observation(
        inspection_id=observation_data.inspection_id,
        observation_text=observation_data.observation_text,
        observed_at=observation_data.observed_at,
        location=observation_data.location,
        severity=observation_data.severity,
        evidence_url=observation_data.evidence_url
    )

    db.add(new_observation)
    db.commit()
    db.refresh(new_observation)

    return new_observation


def get_observations(db: Session):

    observations = (
        db.query(Observation)
        .all()
    )

    return observations


def get_observation(
    db: Session,
    observation_id: int
):

    observation = (
        db.query(Observation)
        .filter(
            Observation.id == observation_id
        )
        .first()
    )

    if not observation:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    return observation


def update_observation(
    db: Session,
    observation_id: int,
    observation_data: ObservationUpdate
):

    observation = (
        db.query(Observation)
        .filter(
            Observation.id == observation_id
        )
        .first()
    )

    if not observation:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    update_data = observation_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(observation, field, value)

    db.commit()
    db.refresh(observation)

    return observation