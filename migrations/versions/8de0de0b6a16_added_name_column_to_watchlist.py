"""added name column to watchlist

Revision ID: 8de0de0b6a16
Revises: 0407dd9d817b
Create Date: 2023-05-07 19:58:12.470502

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8de0de0b6a16'
down_revision = '0407dd9d817b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('watchlist', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=100), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('watchlist', schema=None) as batch_op:
        batch_op.drop_column('name')

    # ### end Alembic commands ###
