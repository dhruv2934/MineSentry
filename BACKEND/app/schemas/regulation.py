from datetime import datetime

from pydantic import BaseModel, ConfigDict


class RegulationCreate(BaseModel):
    document_name: str
    document_type: str | None = None
    source: str
    version: str | None = None
    effective_date: datetime | None = None
    category: str | None = None
    description: str | None = None


class RegulationUpdate(BaseModel):
    document_name: str | None = None
    document_type: str | None = None
    source: str | None = None
    version: str | None = None
    effective_date: datetime | None = None
    category: str | None = None
    description: str | None = None


class RegulationResponse(BaseModel):
    id: int
    document_name: str
    document_type: str | None
    source: str
    version: str | None
    effective_date: datetime | None
    category: str | None
    description: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )