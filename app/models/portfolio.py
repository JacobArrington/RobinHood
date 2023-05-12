from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin

class Portfolio(db.Model, UserMixin):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallet.id')), nullable=False)
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    stocks = db.relationship('Stock', secondary=add_prefix_for_prod('shares'), back_populates='portfolios')
    user = db.relationship("User",  back_populates="portfolio")
    shares = db.relationship('Share', back_populates='portfolio')
    transactions = db.relationship('Transaction', back_populates='portfolio')

    def to_portfolio_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'wallet': self.wallet_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'stocks': [stock.to_stock_dict() for stock in self.stocks],
            'shares': [share.to_share_dict() for share in self.shares],
            'transactions': [transaction.to_transaction_dict() for transaction in self.transactions]
        }
