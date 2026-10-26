from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.violation import Violation
from app.models.regulation_chunk import RegulationChunk
from app.models.violation_regulation import ViolationRegulation
from app.schemas.violation_regulation import (
    ViolationRegulationCreate
)


def add_regulation_to_violation(
    db: Session,
    violation_id: int,
    mapping_data: ViolationRegulationCreate
):

    violation = (
        db.query(Violation)
        .filter(Violation.id == violation_id)
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    regulation_chunk = (
        db.query(RegulationChunk)
        .filter(
            RegulationChunk.id
            == mapping_data.regulation_chunk_id
        )
        .first()
    )

    if not regulation_chunk:
        raise HTTPException(
            status_code=404,
            detail="Regulation chunk not found"
        )

    existing_mapping = (
        db.query(ViolationRegulation)
        .filter(
            ViolationRegulation.violation_id
            == violation_id,
            ViolationRegulation.regulation_chunk_id
            == mapping_data.regulation_chunk_id
        )
        .first()
    )

    if existing_mapping:
        raise HTTPException(
            status_code=400,
            detail="Regulation is already linked to this violation"
        )

    mapping = ViolationRegulation(
        violation_id=violation_id,
        regulation_chunk_id=mapping_data.regulation_chunk_id
    )

    db.add(mapping)
    db.commit()
    db.refresh(mapping)

    return mapping


def get_violation_regulations(
    db: Session,
    violation_id: int
):

    violation = (
        db.query(Violation)
        .filter(Violation.id == violation_id)
        .first()
    )

    if not violation:
        raise HTTPException(
            status_code=404,
            detail="Violation not found"
        )

    mappings = (
        db.query(ViolationRegulation)
        .filter(
            ViolationRegulation.violation_id
            == violation_id
        )
        .all()
    )

    return mappings


def remove_regulation_from_violation(
    db: Session,
    violation_id: int,
    regulation_chunk_id: int
):

    mapping = (
        db.query(ViolationRegulation)
        .filter(
            ViolationRegulation.violation_id
            == violation_id,
            ViolationRegulation.regulation_chunk_id
            == regulation_chunk_id
        )
        .first()
    )

    if not mapping:
        raise HTTPException(
            status_code=404,
            detail="Regulation mapping not found"
        )

    db.delete(mapping)
    db.commit()

    return {
        "message": "Regulation removed from violation"
    }