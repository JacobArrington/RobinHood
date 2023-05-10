from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin





class WatchlistStock(db.Model):
    __tablename__ = 'watchlist_stocks'

    watchlist_id = db.Column(db.Integer, db.ForeignKey('watchlist.id'), primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.id'), primary_key=True)

    watchlist = db.relationship("Watchlist", back_populates="watchlist_stocks")
    stock = db.relationship("Stock", back_populates="watchlist_stocks")
