from flask import Blueprint, jsonify
from app.models import Stock

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('/')
def get_all_stocks():
    stocks = Stock.query.all()
    return [stock.to_stock_dict() for stock in stocks]

@stocks_routes.route('/<int:id>')
def get_stock_by_id(id):
    stock = Stock.query.get(id)
    return stock.to_stock_dict()
