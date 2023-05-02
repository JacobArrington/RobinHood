from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey




class Watchlist(db.Model):
    __tablename__ = 'watchlist'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    stocks = relationship("Stock", back_populates="watchlists")
    user = relationship("User", back_populates="watchlists")


def to_watchlist_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'stock_id': self.stock_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
