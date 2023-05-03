from flask import Blueprint, jsonify
from app.models import Stock, StockHistory

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('/')
def get_all_stocks():
    stocks = Stock.query.all()
    return [stock.to_stock_dict() for stock in stocks]

@stocks_routes.route('/<int:id>')
def get_stock_by_id(id):
    stock = Stock.query.get(id)
    return stock.to_stock_dict()

@stocks_routes.route('/<int:id>/stock_history')
def get_stock_history(id):
    stock = Stock.query.get(id)
    print(stock,'@@@@@@@')
    stock_history = StockHistory.query.get(stock.id)
    print(stock_history,'!!!!!!!!!')
    return stock_history.to_stock_history_dict()
