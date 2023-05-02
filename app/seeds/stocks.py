from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stocks():
    apple = Stock(
        name="Apple", ticker="APPL", price=20.00
    )
    facebook = Stock(
        name="Facebook", ticker="FCBK", price=25.00
    )
    google = Stock(
        name="Google", ticker="GGLE", price=30.00
    )
    instagram = Stock(
        name="Instagram", ticker="INST", price=30.00
    )
    yahoo = Stock(
        name="Yahoo", ticker="YHOO", price=35.00
    )
    

    db.session.add(apple)
    db.session.add(facebook)
    db.session.add(google)
    db.session.add(instagram)
    db.session.add(yahoo)
    db.session.commit()

def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks")) 
    db.session.commit()
