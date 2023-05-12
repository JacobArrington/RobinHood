from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Portfolio

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('')
@login_required
def get_portfolio():
    portfolio = Portfolio.query.filter_by(user_id=current_user.id).first()
    print(portfolio)
    return portfolio.to_portfolio_dict()
