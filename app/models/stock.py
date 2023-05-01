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
    ticker = db.Column(db.String, nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date)
    watchlists = relationship ("WatchList", back_populates='stock')
    portfolios = relationship('Portfolio', secondary='shares', back_populates='stocks')
    shares = relationship ("Share", back_populates='stock')
    transactions = relationship ("Transaction", back_populates='stock')
    stock_history = relationship("StockHistory", back_populates="stock")


    def to_stock_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
