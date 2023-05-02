import random
from datetime import datetime, timedelta
from .models import Stock, StockHistory, db

def create_stock_history():
    stocks_data = {}

    # Get all stocks from the database
    all_stocks = Stock.query.all()

    # Generate dates for a calendar year from a year ago
    start_date = datetime.now() - timedelta(days=365)
    end_date = datetime.now()
    dates = [start_date + timedelta(days=i) for i in range((end_date - start_date).days + 1)]

    # Create a dictionary with stock id as key and list of prices as value
    for stock in all_stocks:
        stock_prices = []
        for date in dates:
            price = round(random.uniform(1, 100), 2)
            stock_prices.append(price)
            key = (stock.id, date.date())
            stocks_data[key] = {'stock_id': stock.id, 'date': date, 'price': price}

        stocks_data[stock.id] = stock_prices

    # Insert stock history into the database
    for stock_data in stocks_data.values():
        stock_history = StockHistory(**stock_data)
        db.session.add(stock_history)

    db.session.commit()

    #return stocks_data
