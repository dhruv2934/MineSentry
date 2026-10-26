from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.corrective_action import (
    CorrectiveActionCreate,
    CorrectiveActionResponse,
    CorrectiveActionUpdate
)
from app.services import corrective_action_service


router = APIRouter(
    prefix="/corrective-actions",
    tags=["Corrective Actions"]
)


@router.post(
    "/",
    response_model=CorrectiveActionResponse
)
def create_corrective_action(
    action_data: CorrectiveActionCreate,
    db: Session = Depends(get_db)
):
    return corrective_action_service.create_corrective_action(
        db,
        action_data
    )


@router.get(
    "/",
    response_model=list[CorrectiveActionResponse]
)
def get_corrective_actions(
    db: Session = Depends(get_db)
):
    return corrective_action_service.get_corrective_actions(
        db
    )


@router.get(
    "/{action_id}",
    response_model=CorrectiveActionResponse
)
def get_corrective_action(
    action_id: int,
    db: Session = Depends(get_db)
):
    return corrective_action_service.get_corrective_action(
        db,
        action_id
    )


@router.patch(
    "/{action_id}",
    response_model=CorrectiveActionResponse
)
def update_corrective_action(
    action_id: int,
    action_data: CorrectiveActionUpdate,
    db: Session = Depends(get_db)
):
    return corrective_action_service.update_corrective_action(
        db,
        action_id,
        action_data
    )