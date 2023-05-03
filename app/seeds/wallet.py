from app.models import db, Wallet, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wallet():
    port_1 = Wallet(
        user_id = 1, account_type = "checking", 
        account_num = 123456789, routing_num = 987654321,
        cash = 15000
    )
    port_2 = Wallet(
        user_id = 2, account_type = "checking", 
        account_num = 789456123, routing_num = 963214785,
        cash = 20
    )
    port_3 = Wallet(
        user_id = 3, account_type = "savings", 
        account_num = 147852369, routing_num = 123789456,
        cash = 40000
    )

    db.session.add(port_1)
    db.session.add(port_2)
    db.session.add(port_3)
    db.session.commit()

def undo_wallet():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wallet RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM wallet"))
        
    db.session.commit()
