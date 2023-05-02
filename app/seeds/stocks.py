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
    tesla = Stock(
        name="Tesla", ticker="TSLA", price=50.00
    )
    amazon = Stock(
        name="Amazon", ticker="AMZN", price=60.00
    )
    uber = Stock(
        name="Uber", ticker="UBER", price=25.00
    )
    bank_of_america = Stock(
        name="Bank of America", ticker="BAC", price=30.00
    )
    lyft = Stock(
        name="Lyft Inc", ticker="LYFT", price=20.00
    )
    american_airline = Stock(
        name="American Airline", ticker="AAL", price=25.00
    )
    wells_fargo = Stock(
        name="Wells Fargo Co", ticker="WFC", price=30.00
    )
    microsoft = Stock(
        name="Microsoft", ticker="MSFT", price=40.00
    )
    verizon = Stock(
        name="Verizon", ticker="VZ", price=15.00
    )
    walt_disney = Stock(
        name="Walt Disney", ticker="DIS", price=30.00
    )
    activision_blizzard = Stock(
        name="Activision Blizzard Inc", ticker="ATVI", price=25.00
    )
    netflix = Stock(
        name="Netflix", ticker="NFLX", price=22.00
    )
    nike = Stock(
        name="Nike Inc", ticker="NKE", price=20.00
    )
    sales_force = Stock(
        name="Salesforce Inc", ticker="CRM", price=70.00
    )
    twitter = Stock(
        name="Twitter Inc", ticker="TWTR", price=40.00
    )

    db.session.add(apple)
    db.session.add(facebook)
    db.session.add(google)
    db.session.add(instagram)
    db.session.add(yahoo)
    db.session.add(tesla)
    db.session.add(amazon)
    db.session.add(uber)
    db.session.add(lyft)
    db.session.add(bank_of_america)
    db.session.add(american_airline)
    db.session.add(wells_fargo)
    db.session.add(microsoft)
    db.session.add(verizon)
    db.session.add(walt_disney)
    db.session.add(activision_blizzard)
    db.session.add(netflix)
    db.session.add(nike)
    db.session.add(sales_force)
    db.session.add(twitter)
    db.session.commit()

def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))
    db.session.commit()
