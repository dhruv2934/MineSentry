from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.inspection import (
    InspectionCreate,
    InspectionResponse,
    InspectionUpdate
)
from app.services import inspection_service


router = APIRouter(
    prefix="/inspections",
    tags=["Inspections"]
)


@router.post(
    "/",
    response_model=InspectionResponse
)
def create_inspection(
    inspection_data: InspectionCreate,
    db: Session = Depends(get_db)
):
    return inspection_service.create_inspection(
        db,
        inspection_data
    )


@router.get(
    "/",
    response_model=list[InspectionResponse]
)
def get_inspections(
    db: Session = Depends(get_db)
):
    return inspection_service.get_inspections(
        db
    )


@router.get(
    "/{inspection_id}",
    response_model=InspectionResponse
)
def get_inspection(
    inspection_id: int,
    db: Session = Depends(get_db)
):
    return inspection_service.get_inspection(
        db,
        inspection_id
    )


@router.patch(
    "/{inspection_id}",
    response_model=InspectionResponse
)
def update_inspection(
    inspection_id: int,
    inspection_data: InspectionUpdate,
    db: Session = Depends(get_db)
):
    return inspection_service.update_inspection(
        db,
        inspection_id,
        inspection_data
    )