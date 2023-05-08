from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey



watchlist_stocks = db.Table(
    'watchlist_stocks',
    db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('watchlist.id')), primary_key=True),
    db.Column('stock_id', db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), primary_key=True),
)
