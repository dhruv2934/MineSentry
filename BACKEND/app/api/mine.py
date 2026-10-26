from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.mine import MineCreate, MineResponse, MineUpdate
from app.services import mine_service


router = APIRouter(
    prefix="/mines",
    tags=["Mines"]
)


@router.post("/", response_model=MineResponse)
def create_mine(
    mine_data: MineCreate,
    db: Session = Depends(get_db)
):
    return mine_service.create_mine(db, mine_data)



@router.get("/{mine_id}", response_model=MineResponse)
def get_mine(
    mine_id: int,
    db: Session = Depends(get_db)
):
    return mine_service.get_mine(db, mine_id)



@router.get("/", response_model=list[MineResponse])
def get_mines(
    db: Session = Depends(get_db)
):
    return mine_service.get_mines(db)


@router.patch("/{mine_id}", response_model=MineResponse)
def update_mine(
    mine_id: int,
    mine_data: MineUpdate,
    db: Session = Depends(get_db)
):
    return mine_service.update_mine(
        db,
        mine_id,
        mine_data
    )




@router.delete("/{mine_id}", response_model=MineResponse)
def deactivate_mine(
    mine_id: int,
    db: Session = Depends(get_db)
):
    return mine_service.deactivate_mine(
        db,
        mine_id
    )