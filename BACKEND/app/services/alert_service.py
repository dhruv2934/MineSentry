from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.models.corrective_action import CorrectiveAction
from app.schemas.alert import (
    AlertCreate,
    AlertUpdate
)


def create_alert(
    db: Session,
    alert_data: AlertCreate
):

    corrective_action = (
        db.query(CorrectiveAction)
        .filter(
            CorrectiveAction.id
            == alert_data.corrective_action_id
        )
        .first()
    )

    if not corrective_action:
        raise HTTPException(
            status_code=404,
            detail="Corrective action not found"
        )

    new_alert = Alert(
        corrective_action_id=alert_data.corrective_action_id,
        alert_type=alert_data.alert_type,
        message=alert_data.message,
        recipient=alert_data.recipient,
        triggered_at=alert_data.triggered_at
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    return new_alert


def get_alerts(db: Session):

    return (
        db.query(Alert)
        .all()
    )


def get_alert(
    db: Session,
    alert_id: int
):

    alert = (
        db.query(Alert)
        .filter(
            Alert.id == alert_id
        )
        .first()
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    return alert


def update_alert(
    db: Session,
    alert_id: int,
    alert_data: AlertUpdate
):

    alert = (
        db.query(Alert)
        .filter(
            Alert.id == alert_id
        )
        .first()
    )

    if not alert:
        raise HTTPException(
            status_code=404,
            detail="Alert not found"
        )

    update_data = alert_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(alert, field, value)

    db.commit()
    db.refresh(alert)

    return alert