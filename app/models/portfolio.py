from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallet.id')), nullable=False)
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    stocks = relationship('Stock', secondary='shares', back_populates='portfolio')
    user = relationship("User",  back_populates="portfolio")
    shares = relationship('Share', back_populates='portfolio')
    transactions = relationship('Transaction', back_populates='portfolio')

def to_portfolio_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'wallet': self.wallet,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
