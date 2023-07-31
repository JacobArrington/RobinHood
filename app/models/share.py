from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey
from flask_login import UserMixin

class Share(db.Model,UserMixin):
    __tablename__ = 'shares'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('portfolios.id')), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')), nullable=False)
    total_shares = db.Column(db.Integer, nullable=False, default=0)
    pending_shares = db.Column(db.Integer, nullable=False, default=0)  
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())
    # Relationships
    
    portfolio = db.relationship('Portfolio', back_populates='shares')
    stock = db.relationship('Stock', back_populates='shares')

    def to_share_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'portfolio_id': self.portfolio_id,
            'stock_id': self.stock_id,
            'total_shares': self.total_shares,
            'pending_shares': self.pending_shares,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
