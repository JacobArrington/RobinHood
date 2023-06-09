
import random
import random
from datetime import datetime, timedelta
from app.models import db, Stock, StockHistory, environment, SCHEMA
from sqlalchemy.sql import text

def create_stock_history():
    stocks_data = {}

    # Get all stocks from the database
    all_stocks = Stock.query.all()

    # Generate dates for a calendar year from a year ago
    start_date = datetime.now() - timedelta(days=365)
    end_date = datetime.now()
    dates = [start_date + timedelta(days=i) for i in range((end_date - start_date).days )]

    # Create a dictionary with stock id as key and a dictionary of prices indexed by date as value
    for stock in all_stocks:
        stock_prices = {}
        for date in dates:
            price = round(random.uniform(1, 100), 2)
            key = date.date()
            stock_prices[key] = {'stock_id': stock.id, 'stock_name': stock.name, 'date': date, 'price': price}
            
        stocks_data[stock.id] = stock_prices
        

    # Insert stock history into the database
    for stock_id, stock_prices in stocks_data.items():
        for key, stock_data in stock_prices.items():
            stock_history = StockHistory(**stock_data)
            db.session.add(stock_history)

    db.session.commit()


def undo_stock_history():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stock_history RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stock_history"))
    db.session.commit()
