from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.regulation import Regulation
from app.models.regulation_chunk import RegulationChunk
from app.schemas.regulation_chunk import (
    RegulationChunkCreate,
    RegulationChunkUpdate
)


def create_regulation_chunk(
    db: Session,
    chunk_data: RegulationChunkCreate
):

    regulation = (
        db.query(Regulation)
        .filter(
            Regulation.id == chunk_data.regulation_id
        )
        .first()
    )

    if not regulation:
        raise HTTPException(
            status_code=404,
            detail="Regulation not found"
        )

    new_chunk = RegulationChunk(
        regulation_id=chunk_data.regulation_id,
        section=chunk_data.section,
        clause=chunk_data.clause,
        content=chunk_data.content,
        page_number=chunk_data.page_number
    )

    db.add(new_chunk)
    db.commit()
    db.refresh(new_chunk)

    return new_chunk


def get_regulation_chunks(
    db: Session
):

    return (
        db.query(RegulationChunk)
        .all()
    )


def get_regulation_chunk(
    db: Session,
    chunk_id: int
):

    chunk = (
        db.query(RegulationChunk)
        .filter(
            RegulationChunk.id == chunk_id
        )
        .first()
    )

    if not chunk:
        raise HTTPException(
            status_code=404,
            detail="Regulation chunk not found"
        )

    return chunk


def update_regulation_chunk(
    db: Session,
    chunk_id: int,
    chunk_data: RegulationChunkUpdate
):

    chunk = (
        db.query(RegulationChunk)
        .filter(
            RegulationChunk.id == chunk_id
        )
        .first()
    )

    if not chunk:
        raise HTTPException(
            status_code=404,
            detail="Regulation chunk not found"
        )

    update_data = chunk_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(chunk, field, value)

    db.commit()
    db.refresh(chunk)

    return chunk