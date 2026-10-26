from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.inspection import Inspection
from app.models.mine import Mine
from app.schemas.inspection import (
    InspectionCreate,
    InspectionUpdate
)


def create_inspection(
    db: Session,
    inspection_data: InspectionCreate
):

    mine = (
        db.query(Mine)
        .filter(Mine.id == inspection_data.mine_id)
        .first()
    )

    if not mine:
        raise HTTPException(
            status_code=404,
            detail="Mine not found"
        )

    new_inspection = Inspection(
        mine_id=inspection_data.mine_id,
        inspection_date=inspection_data.inspection_date,
        inspector_name=inspection_data.inspector_name,
        inspection_type=inspection_data.inspection_type,
        remarks=inspection_data.remarks
    )

    db.add(new_inspection)
    db.commit()
    db.refresh(new_inspection)

    return new_inspection


def get_inspections(db: Session):

    inspections = (
        db.query(Inspection)
        .all()
    )

    return inspections


def get_inspection(
    db: Session,
    inspection_id: int
):

    inspection = (
        db.query(Inspection)
        .filter(Inspection.id == inspection_id)
        .first()
    )

    if not inspection:
        raise HTTPException(
            status_code=404,
            detail="Inspection not found"
        )

    return inspection


def update_inspection(
    db: Session,
    inspection_id: int,
    inspection_data: InspectionUpdate
):

    inspection = (
        db.query(Inspection)
        .filter(Inspection.id == inspection_id)
        .first()
    )

    if not inspection:
        raise HTTPException(
            status_code=404,
            detail="Inspection not found"
        )

    update_data = inspection_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(inspection, field, value)

    db.commit()
    db.refresh(inspection)

    return inspection