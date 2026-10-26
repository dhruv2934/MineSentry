from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.mine import Mine
from app.schemas.mine import MineCreate, MineUpdate


def create_mine(db: Session, mine_data: MineCreate):

    existing_mine = (
        db.query(Mine)
        .filter(Mine.code == mine_data.code)
        .first()
    )

    if existing_mine:
        raise HTTPException(
            status_code=400,
            detail="Mine with this code already exists"
        )

    new_mine = Mine(
        name=mine_data.name,
        code=mine_data.code,
        location=mine_data.location,
        state=mine_data.state,
        district=mine_data.district,
        description=mine_data.description
    )

    db.add(new_mine)
    db.commit()
    db.refresh(new_mine)

    return new_mine


def get_mines(db: Session):

    mines = db.query(Mine).all()

    return mines



def get_mine(db: Session, mine_id: int):

    mine = (
        db.query(Mine)
        .filter(Mine.id == mine_id)
        .first()
    )

    if not mine:
        raise HTTPException(
            status_code=404,
            detail="Mine not found"
        )

    return mine



def update_mine(
    db: Session,
    mine_id: int,
    mine_data: MineUpdate
):

    mine = (
        db.query(Mine)
        .filter(Mine.id == mine_id)
        .first()
    )

    if not mine:
        raise HTTPException(
            status_code=404,
            detail="Mine not found"
        )

    update_data = mine_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(mine, field, value)

    db.commit()
    db.refresh(mine)

    return mine



def deactivate_mine(
    db: Session,
    mine_id: int
):

    mine = (
        db.query(Mine)
        .filter(Mine.id == mine_id)
        .first()
    )

    if not mine:
        raise HTTPException(
            status_code=404,
            detail="Mine not found"
        )

    mine.status = "inactive"

    db.commit()
    db.refresh(mine)

    return mine