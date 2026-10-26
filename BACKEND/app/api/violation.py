from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.violation import (
    ViolationCreate,
    ViolationResponse,
    ViolationUpdate
)
from app.services import violation_service

from app.schemas.violation_regulation import (
    ViolationRegulationCreate,
    ViolationRegulationResponse
)

from app.services import violation_regulation_service

from app.services import observation_analysis_service


##########
#Violation Section
##########

router = APIRouter(
    prefix="/violations",
    tags=["Violations"]
)


@router.post(
    "/",
    response_model=ViolationResponse
)
def create_violation(
    violation_data: ViolationCreate,
    db: Session = Depends(get_db)
):
    return violation_service.create_violation(
        db,
        violation_data
    )


@router.get(
    "/",
    response_model=list[ViolationResponse]
)
def get_violations(
    db: Session = Depends(get_db)
):
    return violation_service.get_violations(
        db
    )

@router.post(
    "/analyze-observation/{observation_id}"
)
def analyze_observation(
    observation_id: int,
    db: Session = Depends(get_db)
):

    result = observation_analysis_service.analyze_observation(
        db=db,
        observation_id=observation_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    return result


@router.get(
    "/{violation_id}",
    response_model=ViolationResponse
)
def get_violation(
    violation_id: int,
    db: Session = Depends(get_db)
):
    return violation_service.get_violation(
        db,
        violation_id
    )


@router.patch(
    "/{violation_id}",
    response_model=ViolationResponse
)
def update_violation(
    violation_id: int,
    violation_data: ViolationUpdate,
    db: Session = Depends(get_db)
):
    return violation_service.update_violation(
        db,
        violation_id,
        violation_data
    )




##########
#Violation Regulation Section
##########  





@router.post(
    "/{violation_id}/regulations",
    response_model=ViolationRegulationResponse
)
def add_regulation_to_violation(
    violation_id: int,
    mapping_data: ViolationRegulationCreate,
    db: Session = Depends(get_db)
):
    return violation_regulation_service.add_regulation_to_violation(
        db,
        violation_id,
        mapping_data
    )


@router.get(
    "/{violation_id}/regulations",
    response_model=list[ViolationRegulationResponse]
)
def get_violation_regulations(
    violation_id: int,
    db: Session = Depends(get_db)
):
    return violation_regulation_service.get_violation_regulations(
        db,
        violation_id
    )


@router.delete(
    "/{violation_id}/regulations/{regulation_chunk_id}"
)
def remove_regulation_from_violation(
    violation_id: int,
    regulation_chunk_id: int,
    db: Session = Depends(get_db)
):
    return violation_regulation_service.remove_regulation_from_violation(
        db,
        violation_id,
        regulation_chunk_id
    )