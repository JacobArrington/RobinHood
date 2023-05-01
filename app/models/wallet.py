from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime
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
    created_at = db.Column(db.Date, default = datetime.datetime.now())
    updated_at = db.Column(db.Date, default = datetime.datetime.now())


def to_wallet_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'account_type': self.account_type,
        'account_num': self.account_num,
        'rounting_num': self.rounting_num,
        'cash': self.cash,
        'created_at': self.created_at,
        'updated_at': self.updated_at
    }
