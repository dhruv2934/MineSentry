from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime

from app.core.database import Base
from sqlalchemy.orm import relationship

class Mine(Base):
    __tablename__ = "mines"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(
        String(150),
        nullable=False
    )

    code = Column(
        String(50),
        unique=True,
        nullable=False,
        index=True
    )

    location = Column(
        String(255),
        nullable=True
    )

    state = Column(
        String(100),
        nullable=True
    )

    district = Column(
        String(100),
        nullable=True
    )

    description = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(30), 
        nullable=False,
        default="Inactive"
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


    inspections = relationship(
        "Inspection",
        back_populates="mine"
    )