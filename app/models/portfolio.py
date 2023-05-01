from .db import db, environment, SCHEMA, add_prefix_for_prod

from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


class Portfolio(db.Model):
    __tablename__ = 'portfolio'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    wallet_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallet.id')), nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    stocks = relationship('Stock', secondary='shares', back_populates='portfolios')
