from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Stock, StockHistory
from flask_login import current_user, login_required
stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('')
def get_all_stocks():
    if current_user.is_authenticated:
        stocks = Stock.query.all()
        return [stock.to_stock_dict() for stock in stocks]
    else:
        # For non-authenticated users, only send ticker and price
        stocks = Stock.query.with_entities(Stock.ticker, Stock.price).all()
        print(stocks, '!!!!!!!!!')
        stocks = Stock.query.with_entities(Stock.id, Stock.ticker, Stock.price).all()
        return jsonify([{'id': stock.id, 'ticker': stock.ticker, 'price': stock.price} for stock in stocks])


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
