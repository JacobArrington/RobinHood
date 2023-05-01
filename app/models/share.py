from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey


class Share(db.Model):
    __tablename__ = 'shares'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')))
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    stock = relationship('Stock', back_populates='shares')
    portfolio = relationship('Portfolio', back_populates='stocks')



def to_share_dict(self):
    return {
        'id': self.id,
        'stock_id': self.stock_id,
        'portfolio_id': self.portfolio_id,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
