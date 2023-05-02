from flask import Blueprint, jsonify
from app.models import Stock

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('/')
def get_all_stocks():
    stocks = Stock.query.all()
    return {'stocks': [stock.to_stock_dict() for stock in stocks]}
