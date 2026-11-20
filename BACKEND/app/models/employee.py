
from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    CheckConstraint,
)
from sqlalchemy.orm import relationship

from app.core.database import Base


class Employee(Base):
    __tablename__ = "employees"

    __table_args__ = (
        CheckConstraint(
            "role IN ('WORKER', 'INSPECTOR', 'MANAGER', 'ADMIN')",
            name="check_employee_role",
        ),
        CheckConstraint(
            "status IN ('ACTIVE', 'INACTIVE')",
            name="check_employee_status",
        ),
    )

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

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

    role = Column(
        String(20),
        nullable=False
    )

    status = Column(
        String(20),
        nullable=False,
        default="INACTIVE"
    )

    mine_id = Column(
        Integer,
        ForeignKey("mines.id"),
        nullable=False,
        index=True
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
        back_populates="employees"
    )
    user_account = relationship(
        "UserAccount",
        back_populates="employee",
        uselist=False
    )