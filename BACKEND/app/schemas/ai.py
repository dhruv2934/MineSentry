from typing import Literal

from pydantic import BaseModel,Field


class ObservationExtraction(BaseModel):
    title: str
    category: str
    affected_workers: int=Field(
        gt=0,
        description="Number of workers affected by the violation. Must be greater than 0."
    )
    location: str | None = None
    description: str | None = None