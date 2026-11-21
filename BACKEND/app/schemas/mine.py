
from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from typing import Literal
from decimal import Decimal


MineStatus = Literal["ACTIVE", "INACTIVE"]


class MineCreate(BaseModel):
    name: str = Field(min_length=1, max_length=150)
    code: str = Field(min_length=1, max_length=50)
    location: str | None = None
    state: str | None = None

    production_tons: Decimal = Field(
        default=Decimal("0.00"),
        ge=0,
        max_digits=14,
        decimal_places=2
    )

    model_config = ConfigDict(extra="forbid")


class MineResponse(BaseModel):
    id: int
    name: str
    code: str
    location: str | None
    state: str | None
    status: MineStatus
    production_tons: float
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MineUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=1,
        max_length=150
    )
    location: str | None = None
    state: str | None = None

    production_tons: Decimal | None = Field(
        default=None,
        ge=0,
        max_digits=14,
        decimal_places=2
    )

    status: MineStatus | None = None

    model_config = ConfigDict(extra="forbid")
