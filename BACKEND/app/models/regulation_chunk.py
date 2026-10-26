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


class RegulationChunk(Base):
    __tablename__ = "regulation_chunks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    regulation_id = Column(
        Integer,
        ForeignKey("regulations.id"),
        nullable=False,
        index=True
    )

    section = Column(
        String(100),
        nullable=True
    )

    clause = Column(
        String(100),
        nullable=True
    )

    content = Column(
        Text,
        nullable=False
    )

    page_number = Column(
        Integer,
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

    regulation = relationship(
        "Regulation",
        back_populates="chunks"
    )

    violation_links = relationship(
        "ViolationRegulation",
        back_populates="regulation_chunk"
    )   