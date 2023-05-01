from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Float, Date, Enum, ForeignKey

class Wallet(db.Model):
    __tablename__ = 'wallet'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    account_type = db.Column(db.Enum('checking' , 'savings', name ='account_type_enum'))
    account_num = db.Column(db.Integer, nullable=False)
    routing_num = db.Column(db.Integer, nullable=False)
    cash = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.Date)
    updated_at = db.Column(db.Date)
    
