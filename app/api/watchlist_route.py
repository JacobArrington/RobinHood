from flask import Blueprint, jsonify, request
from app.models import Watchlist, WatchlistStock,Stock, db
from flask_login import current_user, login_required


watchlist_routes = Blueprint('watchlist', __name__)

@watchlist_routes.route('', methods=['GET', 'POST'])
@login_required
def handle_watchlists():
    if request.method == 'GET':
        watchlists = Watchlist.query.filter_by(user_id=current_user.id).all()
        return jsonify([watchlist.to_watchlist_dict() for watchlist in watchlists])

    elif request.method == 'POST':
        data = request.get_json()
        watchlist = Watchlist(
            user_id=data['user_id'],
            name=data['name']
        )
        db.session.add(watchlist)
        db.session.commit()
        
        # Add stocks to the watchlist
        for stock_id in data['stock_ids']:
            watchlist_stock = WatchlistStock(
                watchlist_id=watchlist.id,
                stock_id=stock_id
            )
            db.session.add(watchlist_stock)
        db.session.commit()

        return jsonify(watchlist.to_watchlist_dict()), 201

# @watchlist_routes.route('/watchlist', methods=['GET'])
# def get_watchlists():
#     watchlists = Watchlist.query.all()
#     return jsonify([watchlist.to_watchlist_dict() for watchlist in watchlists])


# @watchlist_routes.route('/watchlist', methods=['POST'])
# def create_watchlist():
#     data = request.get_json()
#     watchlist = Watchlist(
#         user_id=data['user_id'],
#         stock_id=data['stock_id']
#     )
    # db.session.add(watchlist)
    # db.session.commit()
    # return jsonify(watchlist.to_watchlist_dict()), 201

@watchlist_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if watchlist:
        return jsonify(watchlist.to_watchlist_dict())
    return jsonify({'message': 'Watchlist not found'}), 404


@watchlist_routes.route('/<int:id>/stocks', methods=['PUT'])
@login_required
def update_watchlist_stocks(id):
     data = request.get_json()
     action = data.get('action')
     stock_ids = data.get('stock_ids')
    
     new_name = data.get('name')
     print(data,'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')

     watchlist = Watchlist.query.get(id)
     if not watchlist:
        return {"message": "Watchlist not found"}, 404
     
     if new_name: 
         watchlist.name = new_name
     
     

    #  stock = Stock.query.get(stock_ids)
    #  if not stock:
    #      return {"message": "Stock not found"}, 404
    
     errors = []

     if action == 'add':
         for stock_id in stock_ids:
             stock = Stock.query.get(stock_id)
             if not stock: 
                 errors.append(f"Stock with id {stock_id} not found")
                 continue
             
             
             
             watchlist_stock = WatchlistStock.query.filter_by(watchlist_id=id, stock_id=stock_id).first()
             if watchlist_stock:
                errors.append(f"Stock with id {stock_id} already in watchlist")
                continue 
         
             new_watchlist_stock = WatchlistStock(watchlist_id=id, stock_id=stock_id)
             db.session.add(new_watchlist_stock)
            
           

     elif action == 'remove':
        for stock_id in stock_ids:
             stock = Stock.query.get(stock_id)
             if not stock: 
                errors.append(f"Stock with id {stock_id} not found")
                continue
             watchlist_stock = WatchlistStock.query.filter_by(watchlist_id=id, stock_id=stock_id).first()
             if not watchlist_stock:
                errors.append(f"Stock with id {stock_id} not in watchlist")
                continue
            
             db.session.delete(watchlist_stock)
             
           
     

     db.session.commit()
     if errors: 
         return{'message': 'There were some errors processing the request', 'errors': errors}

     updated_watchlist = Watchlist.query.get(id)
     return updated_watchlist.to_watchlist_dict(), 200

@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_watchlist(id):
    watchlist = Watchlist.query.get(id)
    if watchlist:
       
        WatchlistStock.query.filter_by(watchlist_id=id).delete()
        
        db.session.delete(watchlist)
        db.session.commit()
        return jsonify({'message': 'Watchlist deleted'})
    return jsonify({'message': 'Watchlist not found'}), 404
