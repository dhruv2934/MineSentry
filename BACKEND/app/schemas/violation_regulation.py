from pydantic import BaseModel


class ViolationRegulationCreate(BaseModel):
    regulation_chunk_id: int


class ViolationRegulationResponse(BaseModel):
    violation_id: int
    regulation_chunk_id: int