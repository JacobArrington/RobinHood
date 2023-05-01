# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.orm import relationship
# from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


# class Transaction(db.Model):
#     __tablename__ = 'transactions'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')))
#     transaction_type = db.Column(Enum('buy', 'sell', name='transaction_type_enum'))
#     total_shares = db.Column(db.Integer, nullable=False)
#     created_at = db.Column(db.Date)
#     updated_at = db.Column(db.Date)
#     # Relationships
#     stock = relationship('Stock', back_populates='transactions')
#     user = relationship('User', back_populates='transactions')
#     portfolio = relationship('Portfolio', back_populates='transactions')
