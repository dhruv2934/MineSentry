from datetime import datetime

from pydantic import BaseModel, ConfigDict


class InspectionCreate(BaseModel):
    mine_id: int
    inspection_date: datetime
    inspector_name: str
    inspection_type: str
    remarks: str | None = None


class InspectionUpdate(BaseModel):
    inspection_date: datetime | None = None
    inspector_name: str | None = None
    inspection_type: str | None = None
    status: str | None = None
    remarks: str | None = None


class InspectionResponse(BaseModel):
    id: int
    mine_id: int
    inspection_date: datetime
    inspector_name: str
    inspection_type: str
    status: str
    remarks: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )