from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.models.violation import Violation
from app.ai.observation_extractor import extract_observation


def create_violation_from_observation(
    db: Session,
    observation_id: int
):
    observation = (
        db.query(Observation)
        .filter(
            Observation.id == observation_id
        )
        .first()
    )

    if not observation:
        return None

    # Inspector must provide severity
    if not observation.severity:
        return None

    # Extract factual information using AI
    extracted = extract_observation(
        observation.observation_text
    )

    # Create violation
    violation = Violation(
        observation_id=observation.id,
        title=extracted.title,
        description=extracted.description,
        category=extracted.category,
        severity=observation.severity,
        affected_workers=extracted.affected_workers,
        identified_at=observation.observed_at
    )

    db.add(violation)
    db.commit()
    db.refresh(violation)

    return violation