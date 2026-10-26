from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.alert import (
    AlertCreate,
    AlertResponse,
    AlertUpdate
)
from app.services import alert_service


router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"]
)


@router.post(
    "/",
    response_model=AlertResponse
)
def create_alert(
    alert_data: AlertCreate,
    db: Session = Depends(get_db)
):
    return alert_service.create_alert(
        db,
        alert_data
    )


@router.get(
    "/",
    response_model=list[AlertResponse]
)
def get_alerts(
    db: Session = Depends(get_db)
):
    return alert_service.get_alerts(
        db
    )


@router.get(
    "/{alert_id}",
    response_model=AlertResponse
)
def get_alert(
    alert_id: int,
    db: Session = Depends(get_db)
):
    return alert_service.get_alert(
        db,
        alert_id
    )


@router.patch(
    "/{alert_id}",
    response_model=AlertResponse
)
def update_alert(
    alert_id: int,
    alert_data: AlertUpdate,
    db: Session = Depends(get_db)
):
    return alert_service.update_alert(
        db,
        alert_id,
        alert_data
    )