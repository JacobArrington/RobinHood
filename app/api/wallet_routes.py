from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Wallet


wallet_routes = Blueprint('wallet', __name__)



@wallet_routes.route('/')
@login_required
def get_wallet_by_userId():
    wallet = Wallet.query.get(current_user.id)
    return wallet.to_wallet_dict()
