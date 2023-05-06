from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey, func, or_
from .stock_history import StockHistory 

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    ticker = db.Column(db.String(4), nullable=False, unique=True)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.Date, default = datetime.now())
    updated_at = db.Column(db.Date, default = datetime.now())
    watchlists = relationship ("Watchlist", back_populates='stocks')
    portfolio = relationship('Portfolio', secondary='shares', back_populates='stocks')
    shares = relationship ("Share", back_populates='stocks')
    transactions = relationship ("Transaction", back_populates='stocks')
    stock_history = relationship("StockHistory", back_populates="stocks")


    @classmethod
    def query_time_filter(cls, days_back=None):
        if days_back is not None:
            last_date = cls.query.with_entities(func.max(StockHistory.date)).scalar()
            start_date = last_date - timedelta(days=days_back)
            stocks = cls.query.outerjoin(StockHistory).filter(or_(StockHistory.date >= start_date, StockHistory.id == None)).all()
        else:
            stocks = cls.query.all()

        return stocks


    def to_stock_dict(self):
        stock_history = self.stock_history
        if len(stock_history) > 0:
            min_price = min(hist.price for hist in stock_history)
            max_price = max(hist.price for hist in stock_history)
            # calcs the growth rate as a percentage by comparing the first and last recorded prices for the user selected prices 
            growth = stock_history[-1].price -stock_history[0].price / stock_history[0].price * 100

        return{
            'id': self.id,
            'name': self.name,
            'ticker': self.ticker,
            'price': self.price,
            'min_hist_price': min_price,
            'max_hist_price': max_price,
            'growth': growth,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
