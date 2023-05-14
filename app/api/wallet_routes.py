from flask import Blueprint, jsonify, request, g
from flask_login import current_user, login_required
from datetime import timedelta, datetime
from app.models import Wallet, db
from app.forms import wallet_form


wallet_routes = Blueprint('wallet', __name__)

@wallet_routes.route('', methods=['GET', 'POST'])
@login_required
def handle_wallet():
    if request.method == 'GET':
        wallet = Wallet.query.filter_by(user_id=current_user.id).first()
        if wallet is None:
            pass
        else:
            return wallet.to_wallet_dict()

    if request.method == 'POST':
        data = request.json
        wallet = Wallet(
            user_id=current_user.id,
            account_type=data['account_type'],
            account_num=data['account_num'],
            routing_num=data['routing_num'],
        )
        db.session.add(wallet)
        db.session.commit()
        return jsonify(wallet.to_wallet_dict()), 201



# @wallet_routes.route('/', methods=['GET', 'POST'])
# @login_required
# def get_wallet_by_userId():
#     wallet = Wallet.query.get(current_user.id)
#     return wallet.to_wallet_dict()


# @wallet_routes.route('/', methods=['POST'])
# @login_required
# # def create_wallet():
# #     form = wallet_form()
# #     form['csrf_token'].data = request.cookies['csrf_token']
# #     if form.validate_on_submit():
# #         wallet = Wallet(
# #             account_type=form.data['Account Type'],
# #             account_num = form.data['Account Number'],
# #             routing_num = form.data['Rounting Number'],
# #             cash = form.data['Cash']
# #         )
# #         db.session.add(wallet)
# #         db.session.commit(Wallet)
# #         return wallet.to_wallet_dict()

# def create_wallet():
#     data = request.json
#     wallet = Wallet(
#         user_id=data['user_id'],
#         account_type=data['account_type'],
#         account_num=data['account_num'],
#         routing_num=data['routing_num'],
#         cash=data['cash']
#     )
#     db.session.add(wallet)
#     db.session.commit()
#     return jsonify(wallet.to_wallet_dict()), 201


@wallet_routes.route('/<int:wallet_id>', methods=['PUT'])
@login_required
def update_wallet(wallet_id):
    data = request.json
    wallet = Wallet.query.get(wallet_id)
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404
    wallet.account_type = data.get('account_type', wallet.account_type)
    wallet.account_num = data.get('account_num', wallet.account_num)
    wallet.routing_num = data.get('routing_num', wallet.routing_num)
    wallet.updated_at = datetime.now()
    db.session.commit()
    return jsonify(wallet.to_wallet_dict())


@wallet_routes.route('/<int:wallet_id>', methods=['DELETE'])
@login_required
def delete_wallet(wallet_id):
    wallet = Wallet.query.get(wallet_id)
    if not wallet:
        return jsonify({'error': 'Wallet not found'}), 404
    db.session.delete(wallet)
    db.session.commit()
    return jsonify({'message': 'Wallet deleted successfully'}), 204
