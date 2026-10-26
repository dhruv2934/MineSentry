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


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    corrective_action_id = Column(
        Integer,
        ForeignKey("corrective_actions.id"),
        nullable=False,
        index=True
    )

    alert_type = Column(
        String(50),
        nullable=False
    )

    message = Column(
        Text,
        nullable=False
    )

    recipient = Column(
        String(150),
        nullable=True
    )

    status = Column(
        String(30),
        nullable=False,
        default="pending"
    )

    triggered_at = Column(
        DateTime,
        nullable=False
    )

    resolved_at = Column(
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

    corrective_action = relationship(
        "CorrectiveAction",
        back_populates="alerts"
    )