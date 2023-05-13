from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin





class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    watchlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('watchlist.id')), primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))

    watchlist = db.relationship("Watchlist", back_populates="watchlist_stocks")
    stock = db.relationship("Stock", back_populates="watchlist_stocks")


    def to_watchlistStock_dict(self):
        return{
            'watchlist_id': self.watchlist_id,
            'stock_id': self.stock_id,
            'stocks': self.stock.to_stock_dict()
        }
