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


class Violation(Base):
    __tablename__ = "violations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    observation_id = Column(
        Integer,
        ForeignKey("observations.id"),
        nullable=False,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=True
    )

    category = Column(
        String(100),
        nullable=True
    )

    severity = Column(
        String(30),
        nullable=False
    )

    affected_workers = Column(
        Integer,
        nullable=False,
        default=0
    )   

    status = Column(
        String(30),
        nullable=False,
        default="open"
    )

    identified_at = Column(
        DateTime,
        nullable=False
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

    observation = relationship(
        "Observation",
        back_populates="violations"
    )


    regulation_links = relationship(
        "ViolationRegulation",
        back_populates="violation"
    )   
    

    corrective_actions = relationship(
        "CorrectiveAction",
        back_populates="violation"
    )

    corrective_action_recommendations = relationship(
        "CorrectiveActionRecommendation",
        back_populates="violation"
    )

