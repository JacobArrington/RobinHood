from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, StockHistory

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('')
@login_required
def get_all_stocks():
    print(current_user)
    stocks = Stock.query.all()
    return [stock.to_stock_dict() for stock in stocks]

@stocks_routes.route('/<int:id>')
@login_required
def get_stock_by_id(id):
    stock = Stock.query.get(id)
    return stock.to_stock_dict()

@stocks_routes.route('/<int:id>/stock_history')
@login_required
def get_stock_history_by_id(id):
    stock = Stock.query.get(id)
    stock_history = [sh.to_stock_history_dict() for sh in stock.stock_history]
    return {'stock_history': stock_history}
