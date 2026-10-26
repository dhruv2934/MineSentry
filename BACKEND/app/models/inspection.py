from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base




class Inspection(Base):
    __tablename__ = "inspections"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    mine_id = Column(
        Integer,
        ForeignKey("mines.id"),
        nullable=False,
        index=True
    )

    inspection_date = Column(
        DateTime,
        nullable=False
    )

    inspector_name = Column(
        String(150),
        nullable=False
    )

    inspection_type = Column(
        String(50),
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False,
        default="draft"
    )

    remarks = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    mine = relationship(
        "Mine",
        back_populates="inspections"
    )

    observations = relationship(
        "Observation",
        back_populates="inspection"
    )   