from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RegulationChunkCreate(BaseModel):
    regulation_id: int
    section: str | None = None
    clause: str | None = None
    content: str
    page_number: int | None = None


class RegulationChunkUpdate(BaseModel):
    section: str | None = None
    clause: str | None = None
    content: str | None = None
    page_number: int | None = None


class RegulationChunkResponse(BaseModel):
    id: int
    regulation_id: int
    section: str | None
    clause: str | None
    content: str
    page_number: int | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )