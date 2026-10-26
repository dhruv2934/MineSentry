from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.ai.observation_extractor import extract_observation


def extract_observation_data(
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

    result = extract_observation(
        observation.observation_text
    )

    return result