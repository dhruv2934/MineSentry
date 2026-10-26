from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class Regulation(Base):
    __tablename__ = "regulations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    document_name = Column(
        String(255),
        nullable=False
    )

    document_type = Column(
        String(100),
        nullable=True
    )

    source = Column(
        String(500),
        nullable=False
    )

    version = Column(
        String(50),
        nullable=True
    )

    effective_date = Column(
        DateTime,
        nullable=True
    )

    category = Column(
        String(100),
        nullable=True
    )

    description = Column(
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

    chunks = relationship(
        "RegulationChunk",
        back_populates="regulation"
    )