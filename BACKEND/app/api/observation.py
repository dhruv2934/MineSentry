from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.observation import (
    ObservationCreate,
    ObservationResponse,
    ObservationUpdate
)
from app.services import observation_service


## ai ##

from app.services.ai_observation_service import (
    extract_observation_data
)

from app.services.violation_ai_service import (
    create_violation_from_observation
)

from app.services.regulation_search_service import (
    search_observation_regulations
)

#### graph for the auto triggering the graph workflow so the runner file is imported ######--------------------

from app.graph.graph_runner import (
    run_observation_workflow
)


####-----------------------------------------------
router = APIRouter(
    prefix="/observations",
    tags=["Observations"]
)
@router.post(
    "/",
    response_model=ObservationResponse
)
def create_observation(
    observation_data: ObservationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):

    observation = observation_service.create_observation(
        db,
        observation_data
    )

    background_tasks.add_task(
        run_observation_workflow,
        observation.id
    )

    return observation


@router.get(
    "/",
    response_model=list[ObservationResponse]
)
def get_observations(
    db: Session = Depends(get_db)
):
    return observation_service.get_observations(
        db
    )


@router.get(
    "/{observation_id}",
    response_model=ObservationResponse
)
def get_observation(
    observation_id: int,
    db: Session = Depends(get_db)
):
    return observation_service.get_observation(
        db,
        observation_id
    )


@router.patch(
    "/{observation_id}",
    response_model=ObservationResponse
)
def update_observation(
    observation_id: int,
    observation_data: ObservationUpdate,
    db: Session = Depends(get_db)
):
    return observation_service.update_observation(
        db,
        observation_id,
        observation_data
    )



@router.post(
    "/{observation_id}/extract"
)
def extract_observation_ai(
    observation_id: int,
    db: Session = Depends(get_db)
):
    result = extract_observation_data(
        db=db,
        observation_id=observation_id
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    return result


@router.post(
    "/{observation_id}/create-violation"
)
def create_violation_from_ai(
    observation_id: int,
    db: Session = Depends(get_db)
):
    violation = create_violation_from_observation(
        db=db,
        observation_id=observation_id
    )

    if violation is None:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    if violation == "SEVERITY_REQUIRED":
        raise HTTPException(
            status_code=400,
            detail="Inspector severity must be provided before creating a violation"
        )

    return violation


@router.get(
    "/{observation_id}/regulations"
)
def search_observation_regulation_matches(
    observation_id: int,
    k: int = 4,
    db: Session = Depends(get_db)
):
    results = search_observation_regulations(
        db=db,
        observation_id=observation_id,
        k=k
    )

    if results is None:
        raise HTTPException(
            status_code=404,
            detail="Observation not found"
        )

    return results