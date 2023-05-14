from app.models import db, Watchlist , environment, SCHEMA, Stock
from sqlalchemy.sql import text


def seed_watchlists():
    user1_watchlist1 = Watchlist(user_id=1, name="Tech Stocks")
    user1_watchlist2 = Watchlist(user_id=1, name="Energy Stocks")

    db.session.add(user1_watchlist1)
    db.session.add(user1_watchlist2)
    db.session.commit()

    tech_stock_ids = [1, 2, 3]  # Add stock IDs for the "Tech Stocks" watchlist
    energy_stock_ids = [4, 5, 6]  # Add stock IDs for the "Energy Stocks" watchlist

    tech_stocks = Stock.query.filter(Stock.id.in_(tech_stock_ids)).all()
    energy_stocks = Stock.query.filter(Stock.id.in_(energy_stock_ids)).all()

    user1_watchlist1.stocks.extend(tech_stocks)
    user1_watchlist2.stocks.extend(energy_stocks)

    db.session.add(user1_watchlist1)
    db.session.add(user1_watchlist2)
    db.session.commit()



def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist"))
    db.session.commit()
