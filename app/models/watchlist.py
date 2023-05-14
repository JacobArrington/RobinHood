from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin

class Watchlist(db.Model, UserMixin):
    __tablename__ = 'watchlist'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.Date, default=datetime.datetime.now())
    updated_at = db.Column(db.Date, default=datetime.datetime.now())
    user = db.relationship("User", back_populates="watchlists")
    stocks = db.relationship("Stock", secondary=add_prefix_for_prod('watchlist_stocks'), back_populates="watchlists")
    watchlist_stocks = db.relationship("WatchlistStock", back_populates="watchlist")

    def to_watchlist_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name, 
            'stocks': [watchlist_stock.stock.to_stock_dict() for watchlist_stock in self.watchlist_stocks],
            "stock_ids": [watchlist_stock.stock_id for watchlist_stock in self.watchlist_stocks],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
