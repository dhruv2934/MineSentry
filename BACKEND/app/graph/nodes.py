from sqlalchemy.orm import Session

from app.models.observation import Observation
from app.ai.observation_extractor import extract_observation
from app.services.regulation_search_service import (
    search_observation_regulations
)

from app.ai.violation_evaluator import evaluate_violation
from app.schemas.violation_regulation import ViolationRegulationCreate
from app.schemas.violation import ViolationCreate
from app.services import violation_service
from app.services import violation_regulation_service
from app.models.regulation_chunk import RegulationChunk


from app.risk.risk_service import calculate_violation_risk


from app.ai.corrective_action_generator import (
    generate_corrective_action
)

## for corrective action creation in the db #### ------------------------------------------------------------------------------

from app.schemas.corrective_action_recommendation import (
    CorrectiveActionRecommendationCreate
)

from app.services import (
    corrective_action_recommendation_service
)





## analyze observation node #####--------------------------------------------------------------------------------------

def analyze_observation_node(
    state: dict,
    db: Session
):
    observation_id = state["observation_id"]

    observation = (
        db.query(Observation)
        .filter(
            Observation.id == observation_id
        )
        .first()
    )

    if not observation:
        raise ValueError("Observation not found")

    extracted = extract_observation(
        observation.observation_text
    )

    return {
        "observation_id": observation.id,
        "observation_text": observation.observation_text,
        "severity": observation.severity,
        "observed_at": observation.observed_at,

        "title": extracted.title,
        "category": extracted.category,
        "affected_workers": extracted.affected_workers,
        "location": extracted.location,
        "description": extracted.description,
    }



## regulation search node #####--------------------------------------------------------------------------------------

def search_regulations_node(
    state: dict,
    db: Session
):
    observation_id = state["observation_id"]

    regulations = search_observation_regulations(
        db=db,
        observation_id=observation_id,
        k=4
    )

    if regulations is None:
        raise ValueError("Observation not found")

    return {
        "regulations": regulations
    }


## violation evaluator node #####--------------------------------------------------------------------------------------


def evaluate_violation_node(
    state: dict,
    db: Session
):
    observation_text = state["observation_text"]
    regulations = state["regulations"]

    evaluation = evaluate_violation(
        observation_text=observation_text,
        regulations=regulations
    )

    return {
        "is_violation": evaluation.is_violation,
        "matched_regulation_number": evaluation.matched_regulation_number,
        "violation_reason": evaluation.reason
    }


## create violation node #####--------------------------------------------------------------------------------------


def create_violation_node(
    state: dict,
    db: Session
):
    if not state["is_violation"]:
        return {}

    # Prepare violation data from the information
    # already extracted by Node 1
    violation_data = ViolationCreate(
        observation_id=state["observation_id"],
        title=state["title"],
        description=state["description"],
        category=state["category"],
        severity=state["severity"],
        affected_workers=state["affected_workers"],
        identified_at=state["observed_at"]
    )

    # Use the existing violation service
    violation = violation_service.create_violation(
        db=db,
        violation_data=violation_data
    )

    # Find the RegulationChunk selected by Node 3
    regulation_chunk = (
        db.query(RegulationChunk)
        .filter(
            RegulationChunk.section
            == f"Regulation {state['matched_regulation_number']}"
        )
        .first()
    )

    if not regulation_chunk:
        raise ValueError(
            "Matched regulation chunk not found"
        )

    # Prepare regulation mapping data
    mapping_data = ViolationRegulationCreate(
        regulation_chunk_id=regulation_chunk.id
    )

    # Use the existing regulation-linking service
    mapping = (
        violation_regulation_service.add_regulation_to_violation(
            db=db,
            violation_id=violation.id,
            mapping_data=mapping_data
        )
    )

    return {
        "violation_id": violation.id,
        "regulation_chunk_id": mapping.regulation_chunk_id
    }         



## calculate risk node #####--------------------------------------------------------------------------------------


def calculate_risk_node(
    state: dict,
    db: Session
):
    violation_id = state["violation_id"]

    risk_result = calculate_violation_risk(
        db=db,
        violation_id=violation_id
    )

    if risk_result is None:
        raise ValueError(
            "Unable to calculate risk for violation"
        )

    return {
        "risk_score": risk_result["score"],
        "risk_level": risk_result["risk_level"],
        "risk_factors": risk_result["factors"],
        "recurrence_count": risk_result["recurrence_count"],
        "historical_violation_count": risk_result[
            "historical_violation_count"
        ]
    }



## generate corrective action node #####--------------------------------------------------------------------------------------

def generate_corrective_action_node(
    state: dict,
    db: Session
):
    regulation = None

    for item in state["regulations"]:
        if (
            item["regulation_number"]
            == state["matched_regulation_number"]
        ):
            regulation = item
            break

    if regulation is None:
        raise ValueError(
            "Matched regulation not found in state"
        )

    recommendation = generate_corrective_action(
        observation_text=state["observation_text"],
        violation_title=state["title"],
        violation_description=state["description"],
        regulation_content=regulation["content"],
        risk_level=state["risk_level"],
        risk_score=state["risk_score"],
        affected_workers=state["affected_workers"],
        recurrence_count=state["recurrence_count"]
    )

    recommendation_data = (
        CorrectiveActionRecommendationCreate(
            violation_id=state["violation_id"],
            title=recommendation.title,
            description=recommendation.description,
            recommended_deadline_days=(
                recommendation.recommended_deadline_days
            ),
            reason=recommendation.reason
        )
    )

    saved_recommendation = (
        corrective_action_recommendation_service
        .create_recommendation(
            db=db,
            recommendation_data=recommendation_data
        )
    )

    return {
        "recommendation_id": saved_recommendation.id,
        "recommended_action_title": recommendation.title,
        "recommended_action_description": (
            recommendation.description
        ),
        "recommended_deadline_days": (
            recommendation.recommended_deadline_days
        ),
        "recommendation_reason": recommendation.reason
    }
