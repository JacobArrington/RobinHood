from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey

class StockHistory(db.Model):
    __tablename__ = 'stock_history'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stocks.id')))
    price = db.Column(db.Float, nullable=False)
    date =  db.Column(db.Date , nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    stock = relationship("Stock", back_populates="stock_history")
