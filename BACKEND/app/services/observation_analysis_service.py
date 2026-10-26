from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.services.ai_observation_service import extract_observation_data


def analyze_observation(
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

    extracted = extract_observation_data(
        db=db,
        observation_id=observation_id
    )

    return {
        "observation_id": observation_id,
        "title": extracted.title,
        "category": extracted.category,
        "affected_workers": extracted.affected_workers,
        "location": extracted.location,
        "description": extracted.description
    }