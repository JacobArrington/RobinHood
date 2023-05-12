from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Portfolio, db

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('')
@login_required
def get_portfolio():
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    return portfolio.to_portfolio_dict()

@portfolio_routes.route('/<int:portfolio_id>', methods=['PUT'])
@login_required
def update_buyingpower(portfolio_id):
    data=request.json
    portfolio = Portfolio.query.get(portfolio_id)
    portfolio.buyingPower = data.get('buyingPower', portfolio.buyingPower)
    db.session.commit()
    return jsonify(portfolio.to_portfolio_dict())
