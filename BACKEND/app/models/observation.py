from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class Observation(Base):
    __tablename__ = "observations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    inspection_id = Column(
        Integer,
        ForeignKey("inspections.id"),
        nullable=False,
        index=True
    )

    observation_text = Column(
        Text,
        nullable=False
    )

    observed_at = Column(
        DateTime,
        nullable=False
    )

    location = Column(
        String(255),
        nullable=True
    )

    severity = Column(
        String(30),
        nullable=True
    )

    evidence_url = Column(
        String(500),
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

    inspection = relationship(
        "Inspection",
        back_populates="observations"
    )

    violations = relationship(
        "Violation",
        back_populates="observation"
    )