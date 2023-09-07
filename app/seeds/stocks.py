from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_stocks():
    apple = Stock(
        name="Apple", ticker="APPL", price = round(random.uniform(1, 100), 2)
    )
    facebook = Stock(
        name="Facebook", ticker="FCBK", price = round(random.uniform(1, 100), 2)
    )
    google = Stock(
        name="Google", ticker="GGLE", price = round(random.uniform(1, 100), 2)
    )
    instagram = Stock(
        name="Instagram", ticker="INST", price = round(random.uniform(1, 100), 2)
    )
    yahoo = Stock(
        name="Yahoo", ticker="YHOO", price = round(random.uniform(1, 100), 2)
    )
    tesla = Stock(
        name="Tesla", ticker="TSLA", price = round(random.uniform(1, 100), 2)
    )
    amazon = Stock(
        name="Amazon", ticker="AMZN", price = round(random.uniform(1, 100), 2)
    )
    uber = Stock(
        name="Uber", ticker="UBER", price = round(random.uniform(1, 100), 2)
    )
    bank_of_america = Stock(
        name="Bank of America", ticker="BAC", price = round(random.uniform(1, 100), 2)
    )
    lyft = Stock(
        name="Lyft Inc", ticker="LYFT", price = round(random.uniform(1, 100), 2)
    )
    american_airline = Stock(
        name="American Airline", ticker="AAL", price = round(random.uniform(1, 100), 2)
    )
    wells_fargo = Stock(
        name="Wells Fargo Co", ticker="WFC", price = round(random.uniform(1, 100), 2)
    )
    microsoft = Stock(
        name="Microsoft", ticker="MSFT", price = round(random.uniform(1, 100), 2)
    )
    verizon = Stock(
        name="Verizon", ticker="VZ", price = round(random.uniform(1, 100), 2)
    )
    walt_disney = Stock(
        name="Walt Disney", ticker="DIS", price = round(random.uniform(1, 100), 2)
    )
    activision_blizzard = Stock(
        name="Activision Blizzard Inc", ticker="ATVI", price = round(random.uniform(1, 100), 2)
    )
    netflix = Stock(
        name="Netflix", ticker="NFLX", price = round(random.uniform(1, 100), 2)
    )
    nike = Stock(
        name="Nike Inc", ticker="NKE", price = round(random.uniform(1, 100), 2)
    )
    sales_force = Stock(
        name="Salesforce Inc", ticker="CRM", price = round(random.uniform(1, 100), 2)
    )
    twitter = Stock(
        name="Twitter Inc", ticker="TWTR", price = round(random.uniform(1, 100), 2)
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
