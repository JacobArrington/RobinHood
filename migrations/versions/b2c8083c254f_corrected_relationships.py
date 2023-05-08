"""corrected relationships

Revision ID: b2c8083c254f
Revises: 8de0de0b6a16
Create Date: 2023-05-07 22:34:40.148378

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b2c8083c254f'
down_revision = '8de0de0b6a16'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('watchlist_stocks',
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.Column('stock_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['stock_id'], ['stocks.id'], ),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlist.id'], ),
    sa.PrimaryKeyConstraint('watchlist_id', 'stock_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlist_stocks')
    # ### end Alembic commands ###
