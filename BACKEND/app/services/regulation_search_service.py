from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.rag.rag_service import search_regulations


def search_observation_regulations(
    db: Session,
    observation_id: int,
    k: int = 4
):
    observation = (
        db.query(Observation)
        .filter(Observation.id == observation_id)
        .first()
    )

    if not observation:
        return None

    results = search_regulations(
        query=observation.observation_text,
        k=k
    )

    return results