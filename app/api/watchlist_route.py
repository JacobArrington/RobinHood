from flask import Blueprint, jsonify, request
from .db import db, add_prefix_for_prod
from .models import Watchlist



watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('/watchlists', methods=['GET'])
def get_watchlists():
    watchlists = Watchlist.query.all()
    return jsonify([watchlist.to_watchlist_dict() for watchlist in watchlists])

@watchlist_routes.route('/watchlists/<int:id>', methods=['GET'])
def get_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if watchlist:
        return jsonify(watchlist.to_watchlist_dict())
    return jsonify({'message': 'Watchlist not found'}), 404

@watchlist_routes.route('/watchlists', methods=['POST'])
def create_watchlist():
    data = request.get_json()
    watchlist = Watchlist(
        user_id=data['user_id'],
        stock_id=data['stock_id']
    )
    db.session.add(watchlist)
    db.session.commit()
    return jsonify(watchlist.to_watchlist_dict()), 201


@watchlist_routes.route('/watchlists/<int:id>', methods=['PUT'])
def update_watchlist(id):
    data = request.get_json()
    watchlist = Watchlist.query.get(id)
    if watchlist:
        watchlist.user_id = data['user_id']
        watchlist.stock_id = data['stock_id']
        db.session.commit()
        return jsonify(watchlist.to_watchlist_dict())
    return jsonify({'message': 'Watchlist not found'}), 404


@watchlist_routes.route('/watchlists/<int:id>', methods=['DELETE'])
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if watchlist:
        db.session.delete(watchlist)
        db.session.commit()
        return jsonify({'message': 'Watchlist deleted'})
    return jsonify({'message': 'Watchlist not found'}), 404
