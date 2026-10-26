from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.regulation import (
    RegulationCreate,
    RegulationResponse,
    RegulationUpdate
)
from app.services import regulation_service


router = APIRouter(
    prefix="/regulations",
    tags=["Regulations"]
)


@router.post(
    "/",
    response_model=RegulationResponse
)
def create_regulation(
    regulation_data: RegulationCreate,
    db: Session = Depends(get_db)
):
    return regulation_service.create_regulation(
        db,
        regulation_data
    )


@router.get(
    "/",
    response_model=list[RegulationResponse]
)
def get_regulations(
    db: Session = Depends(get_db)
):
    return regulation_service.get_regulations(
        db
    )


@router.get(
    "/{regulation_id}",
    response_model=RegulationResponse
)
def get_regulation(
    regulation_id: int,
    db: Session = Depends(get_db)
):
    return regulation_service.get_regulation(
        db,
        regulation_id
    )


@router.patch(
    "/{regulation_id}",
    response_model=RegulationResponse
)
def update_regulation(
    regulation_id: int,
    regulation_data: RegulationUpdate,
    db: Session = Depends(get_db)
):
    return regulation_service.update_regulation(
        db,
        regulation_id,
        regulation_data
    )