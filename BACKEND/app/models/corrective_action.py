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


class CorrectiveAction(Base):
    __tablename__ = "corrective_actions"

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
        nullable=True
    )

    assigned_to = Column(
        String(150),
        nullable=True
    )

    due_date = Column(
        DateTime,
        nullable=True
    )

    status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    completed_at = Column(
        DateTime,
        nullable=True
    )

    completion_notes = Column(
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

    violation = relationship(
        "Violation",
        back_populates="corrective_actions"
    )

    alerts = relationship(
        "Alert",
        back_populates="corrective_action"
    )
    