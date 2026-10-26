from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.regulation_chunk import (
    RegulationChunkCreate,
    RegulationChunkResponse,
    RegulationChunkUpdate
)
from app.services import regulation_chunk_service


router = APIRouter(
    prefix="/regulation-chunks",
    tags=["Regulation Chunks"]
)


@router.post(
    "/",
    response_model=RegulationChunkResponse
)
def create_regulation_chunk(
    chunk_data: RegulationChunkCreate,
    db: Session = Depends(get_db)
):
    return regulation_chunk_service.create_regulation_chunk(
        db,
        chunk_data
    )


@router.get(
    "/",
    response_model=list[RegulationChunkResponse]
)
def get_regulation_chunks(
    db: Session = Depends(get_db)
):
    return regulation_chunk_service.get_regulation_chunks(
        db
    )


@router.get(
    "/{chunk_id}",
    response_model=RegulationChunkResponse
)
def get_regulation_chunk(
    chunk_id: int,
    db: Session = Depends(get_db)
):
    return regulation_chunk_service.get_regulation_chunk(
        db,
        chunk_id
    )


@router.patch(
    "/{chunk_id}",
    response_model=RegulationChunkResponse
)
def update_regulation_chunk(
    chunk_id: int,
    chunk_data: RegulationChunkUpdate,
    db: Session = Depends(get_db)
):
    return regulation_chunk_service.update_regulation_chunk(
        db,
        chunk_id,
        chunk_data
    )