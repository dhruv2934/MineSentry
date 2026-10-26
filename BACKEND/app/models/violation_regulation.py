from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class ViolationRegulation(Base):
    __tablename__ = "violation_regulations"

    violation_id = Column(
        Integer,
        ForeignKey("violations.id"),
        primary_key=True
    )

    regulation_chunk_id = Column(
        Integer,
        ForeignKey("regulation_chunks.id"),
        primary_key=True
    )

    violation = relationship(
        "Violation",
        back_populates="regulation_links"
    )

    regulation_chunk = relationship(
        "RegulationChunk",
        back_populates="violation_links"
    )