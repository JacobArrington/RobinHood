from flask import Flask, request, jsonify, Blueprint
from flask_login import current_user, login_required
from datetime import datetime
from app.models import Transaction, Stock, Portfolio, db
from apscheduler.schedulers.background import BackgroundScheduler



transaction_route = Blueprint('transactions',__name__)
scheduler = BackgroundScheduler()


def check_stock_prices():
   
    pending_transactions = Transaction.query.filter_by(is_pending=True).all()
    session = db.session()
    
    try:
        for transaction in pending_transactions:
            
            stock = Stock.query.get(transaction.stock_id)
            current_price = stock.price if stock else None
            
            
            if current_price is not None:
                if (transaction.transaction_type == 'buy' and current_price <= transaction.price_per_share) or \
                (transaction.transaction_type == 'sell' and current_price >= transaction.price_per_share):
                    transaction.is_pending = False
                    
                    transaction.total_price = transaction.price_per_share * transaction.total_shares
                    session.add(transaction)

                    portfolio = Portfolio.query.get(transaction.portfolio_id)
                    if transaction.transaction_type == 'buy':
                        portfolio.committed_buying_power -= transaction.total_price
                        portfolio.total_shares += transaction.total_shares
                    elif transaction.transaction_type == 'sell':
                        portfolio.buying_power += transaction.total_price
                        portfolio.total_shares -= transaction.total_shares
                    session.add(portfolio)



       
        session.commit()
    except:
        
        session.rollback()
        raise
    finally:
        
        session.close()
@scheduler.scheduled_jobs('interval', minutes=20)
def timed_job():
    check_stock_prices()

scheduler.start()

# Get all transactions
@transaction_route.route('', methods=['GET'])
@login_required
def get_transactions():
    transactions = Transaction.query.filter_by(user_id=current_user.id).all()
    return jsonify([transaction.to_transaction_dict() for transaction in transactions])

# Create a new transaction
@transaction_route.route('', methods=['POST'])
@login_required
def create_transaction():
    data = request.get_json()
    transaction = Transaction(
        stock_id=data['stock_id'],
        user_id=data['user_id'],
        portfolio_id=data['portfolio_id'],
        transaction_type=data['transaction_type'],
        total_shares=data['total_shares'],
        price_per_share=data['price_per_share'],
        is_pending=data['is_pending'],
        total_price=data['total_price']
    )
    db.session.add(transaction)
    db.session.commit()
    return jsonify(transaction.to_transaction_dict()), 201

# Get a single transaction by ID
# @transaction_route.route('/<int:transaction_id>', methods=['GET'])

# def get_transaction(transaction_id):
#     transaction = Transaction.query.get_or_404(transaction_id)
#     return jsonify(transaction.to_transaction_dict())

# Update an existing transaction by ID
@transaction_route.route('/<int:transaction_id>', methods=['PUT'])
@login_required
def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    data = request.get_json()
    transaction.stock_id = data.get('stock_id', transaction.stock_id)
    transaction.user_id = data.get('user_id', transaction.user_id)
    transaction.portfolio_id = data.get('portfolio_id', transaction.portfolio_id)
    transaction.transaction_type = data.get('transaction_type', transaction.transaction_type)
    transaction.total_shares = data.get('total_shares', transaction.total_shares)
    transaction.price_per_share = data.get('price_per_share', transaction.price_per_share)
    transaction.updated_at = datetime.datetime.now()
    db.session.commit()
    return jsonify(transaction.to_transaction_dict())

# Delete an existing transaction by ID
@transaction_route.route('/<int:transaction_id>', methods=['DELETE'])
@login_required
def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    db.session.delete(transaction)
    db.session.commit()
    return '', 204
