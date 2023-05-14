from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text

def seed_portfolio():
   portfolio_1 = Portfolio(
      user_id = 1, wallet_id = 1, buyingPower=750000
   )
   portfolio_2 = Portfolio(
      user_id = 2, wallet_id = 2, buyingPower=30
   )
   portfolio_3 = Portfolio(
      user_id = 3, wallet_id = 3, buyingPower=40
   )

   db.session.add(portfolio_1)
   db.session.add(portfolio_2)
   db.session.add(portfolio_3)
   db.session.commit()

def undo_portfolio():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
