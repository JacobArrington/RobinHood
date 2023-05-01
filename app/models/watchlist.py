from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey




class Watchlist(db.Model):
    __tablename__ = 'watchlist'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    stock = relationship("Stock", back_populates="watchlists")
    portfolio = relationship("Portfolio", back_populates="watchlists")
