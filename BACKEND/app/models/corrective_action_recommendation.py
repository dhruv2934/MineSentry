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


class CorrectiveActionRecommendation(Base):
    __tablename__ = "corrective_action_recommendations"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    violation_id = Column(
        Integer,
        ForeignKey("violations.id"),
        nullable=False,
        index=True
    )

    title = Column(
        String(255),
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    recommended_deadline_days = Column(
        Integer,
        nullable=False
    )

    reason = Column(
        Text,
        nullable=True
    )

    status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    reviewed_by = Column(
        String(150),
        nullable=True
    )

    reviewed_at = Column(
        DateTime,
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

    violation = relationship(
        "Violation",
        back_populates="corrective_action_recommendations"
    )