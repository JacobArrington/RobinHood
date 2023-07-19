from flask import Flask, request, jsonify, Blueprint
from flask_login import current_user, login_required
from datetime import datetime
from app.models import Transaction, Stock, Portfolio, db

transaction_route = Blueprint('transactions',__name__)

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

def update_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    data = request.get_json()
    transaction.stock_id = data.get('stock_id', transaction.stock_id)
    transaction.user_id = data.get('user_id', transaction.user_id)
    transaction.portfolio_id = data.get('portfolio_id', transaction.portfolio_id)
    transaction.transaction_type = data.get('transaction_type', transaction.transaction_type)
    transaction.total_shares = data.get('total_shares', transaction.total_shares)
    transaction.updated_at = datetime.datetime.now()
    db.session.commit()
    return jsonify(transaction.to_transaction_dict())

# Delete an existing transaction by ID
@transaction_route.route('/<int:transaction_id>', methods=['DELETE'])

def delete_transaction(transaction_id):
    transaction = Transaction.query.get(transaction_id)
    db.session.delete(transaction)
    db.session.commit()
    return '', 204
