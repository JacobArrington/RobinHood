from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Portfolio, wallet, User

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('')
@login_required
def get_portfolio():
    current = current_user.portfolio
    return current[0].to_portfolio_dict()
