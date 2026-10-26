"""add affected workers to violations

Revision ID: 30e224947fa9
Revises: 25140d828a53
Create Date: 2026-09-11
"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "30e224947fa9"
down_revision: Union[str, Sequence[str], None] = "25140d828a53"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass