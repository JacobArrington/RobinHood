"""empty message

Revision ID: 7905b8705847
Revises: 9c85e6f59e14
Create Date: 2023-08-14 21:43:26.657290

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7905b8705847'
down_revision = '9c85e6f59e14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.drop_column('is_pending')
        batch_op.drop_column('price_per_share')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transactions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price_per_share', sa.INTEGER(), nullable=False))
        batch_op.add_column(sa.Column('is_pending', sa.BOOLEAN(), nullable=False))

    # ### end Alembic commands ###