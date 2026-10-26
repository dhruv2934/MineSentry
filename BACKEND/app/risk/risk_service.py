from datetime import datetime

from sqlalchemy.orm import Session

from app.models.violation import Violation
from app.models.corrective_action import CorrectiveAction
from app.models.observation import Observation
from app.models.inspection import Inspection

from app.risk.risk_engine import calculate_risk


def calculate_violation_risk(
    db: Session,
    violation_id: int
):
    violation = (
        db.query(Violation)
        .filter(Violation.id == violation_id)
        .first()
    )

    if not violation:
        return None

    # --------------------------------------------------
    # 1. Severity
    # --------------------------------------------------

    severity = violation.severity

    # --------------------------------------------------
    # 2. Find the mine of this violation
    # --------------------------------------------------

    observation = (
        db.query(Observation)
        .filter(
            Observation.id == violation.observation_id
        )
        .first()
    )

    if not observation:
        return None

    inspection = (
        db.query(Inspection)
        .filter(
            Inspection.id == observation.inspection_id
        )
        .first()
    )

    if not inspection:
        return None

    mine_id = inspection.mine_id

    # --------------------------------------------------
    # 3. Historical violations count
    # --------------------------------------------------
    historical_violation_count = (
    db.query(Violation)
    .join(
        Observation,
        Violation.observation_id == Observation.id
    )
    .join(
        Inspection,
        Observation.inspection_id == Inspection.id
    )
    .filter(
        Violation.id != violation.id,
        Inspection.mine_id == mine_id
    )
    .count()
    )

    # --------------------------------------------------
    # 4. Recurrence
    # --------------------------------------------------

    recurrence_count = (
    db.query(Violation)
    .join(
        Observation,
        Violation.observation_id == Observation.id
    )
    .join(
        Inspection,
        Observation.inspection_id == Inspection.id
    )
    .filter(
        Violation.id != violation.id,
        Violation.category == violation.category,
        Inspection.mine_id == mine_id
    )
    .count()
    )

    # --------------------------------------------------
    # 5. Overdue corrective actions
    # --------------------------------------------------

    overdue_actions = (
        db.query(CorrectiveAction)
        .filter(
            CorrectiveAction.violation_id == violation.id,
            CorrectiveAction.due_date < datetime.utcnow(),
            CorrectiveAction.status != "completed"
        )
        .count()
    )

    # --------------------------------------------------
    # 6. Affected workers
    # --------------------------------------------------

    # Not available yet.
    # This will come from AI extraction later.

    affected_workers = violation.affected_workers

    # --------------------------------------------------
    # 7. Calculate risk
    # --------------------------------------------------

    risk_result = calculate_risk(
        severity=severity,
        recurrence_count=recurrence_count,
        affected_workers=affected_workers,
        overdue_actions=overdue_actions,
        historical_violation_count=historical_violation_count
    )
    
    return {
        **risk_result,
        "recurrence_count": recurrence_count,
        "historical_violation_count": historical_violation_count
    }