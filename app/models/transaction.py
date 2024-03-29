from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey 
from flask_login import UserMixin

class Transaction(db.Model, UserMixin):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')))
    transaction_type = db.Column(Enum('buy', 'sell', name='transaction_type_enum'))
    total_shares = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    # price_per_share = db.Column(db.Integer, nullable=False)
    # is_pending = db.Column(db.Boolean, nullable=False, default = True)
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    # Relationships
    stocks = db.relationship('Stock', back_populates='transactions')
    user = db.relationship('User', back_populates='transactions')
    portfolio = db.relationship('Portfolio', back_populates='transactions')


    def to_transaction_dict(self):
        return {
            'id': self.id,
            'stock_id': self.stock_id,
            'user_id': self.user_id,
            'portfolio_id': self.portfolio_id,
            'transaction_type': self.transaction_type,
            #'is_pending': self.is_pending,
            'total_price':self.total_price,
            'total_shares': self.total_shares,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
