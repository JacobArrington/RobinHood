from .db import db, environment, SCHEMA, add_prefix_for_prod

import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    ticker = db.Column(db.String(4), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.Date, default=datetime.datetime.now())
    updated_at = db.Column(db.Date, default=datetime.datetime.now())
    watchlists = db.relationship("Watchlist", secondary=add_prefix_for_prod('watchlist_stocks'), back_populates='stocks')
    shares = db.relationship("Share", back_populates='stock')
    portfolios = db.relationship("Portfolio", secondary=add_prefix_for_prod('shares'), back_populates='stocks')
    transactions = db.relationship("Transaction", back_populates='stocks')
    stock_history = db.relationship("StockHistory", back_populates="stocks")
    watchlist_stocks = db.relationship("WatchlistStock", back_populates="stock")


    def to_stock_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': self.price,
            'watchlists': [watchlist.id for watchlist in self.watchlists],
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
