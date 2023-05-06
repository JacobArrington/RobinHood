from flask import Blueprint, jsonify , request
from app.models import Stock, StockHistory
from datetime import datetime, timedelta

stocks_routes = Blueprint('stocks', __name__)

@stocks_routes.route('')
def get_all_stocks():
    try:
        sortBy =  request.args.get('sortBy', default=None, type=str)
        orderBy = request.args.get('orderBy', default='asc', type=str)
        time_period = request.args.get('time_period', default=None, type=str)

        stocks = Stock.query.all()


    
        

        if time_period == 'daily':
            days_back = 1
        elif time_period == 'weekly':
            days_back =7
        elif time_period == 'monthly':
            days_back = 30 
        elif time_period == 'quarterly':
            days_back = 90
        elif time_period == 'yearly':
            days_back = 365
        else:
            days_back = None

        stocks = Stock.query_time_filter(days_back)

        return[stock.to_stock_dict() for stock in stocks]
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred on the server side"}), 500




@stocks_routes.route('/<int:id>')
def get_stock_by_id(id):
    stock = Stock.query.get(id)
    return stock.to_stock_dict()

@stocks_routes.route('/<int:id>/stock_history')
def get_stock_history_by_id(id):
    stock = Stock.query.get(id)
    stock_history = [sh.to_stock_history_dict() for sh in stock.stock_history]
    return {'stock_history': stock_history}
