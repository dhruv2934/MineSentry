from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.regulation import Regulation
from app.schemas.regulation import (
    RegulationCreate,
    RegulationUpdate
)


def create_regulation(
    db: Session,
    regulation_data: RegulationCreate
):

    new_regulation = Regulation(
        document_name=regulation_data.document_name,
        document_type=regulation_data.document_type,
        source=regulation_data.source,
        version=regulation_data.version,
        effective_date=regulation_data.effective_date,
        category=regulation_data.category,
        description=regulation_data.description
    )

    db.add(new_regulation)
    db.commit()
    db.refresh(new_regulation)

    return new_regulation


def get_regulations(db: Session):

    return (
        db.query(Regulation)
        .all()
    )


def get_regulation(
    db: Session,
    regulation_id: int
):

    regulation = (
        db.query(Regulation)
        .filter(
            Regulation.id == regulation_id
        )
        .first()
    )

    if not regulation:
        raise HTTPException(
            status_code=404,
            detail="Regulation not found"
        )

    return regulation


def update_regulation(
    db: Session,
    regulation_id: int,
    regulation_data: RegulationUpdate
):

    regulation = (
        db.query(Regulation)
        .filter(
            Regulation.id == regulation_id
        )
        .first()
    )

    if not regulation:
        raise HTTPException(
            status_code=404,
            detail="Regulation not found"
        )

    update_data = regulation_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(regulation, field, value)

    db.commit()
    db.refresh(regulation)

    return regulation