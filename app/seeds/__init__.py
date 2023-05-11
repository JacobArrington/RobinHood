from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stocks import seed_stocks, undo_stocks
from .wallet import seed_wallet, undo_wallet
from .stock_history import create_stock_history, undo_stock_history
from .portfolio import seed_portfolio,  undo_portfolio
from .watchlist import seed_watchlists, undo_watchlists
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
       # transoction undo here
       # shares here
        undo_stock_history()
        undo_watchlists()
        undo_portfolio()
        undo_wallet()
        undo_stocks()
        undo_users()
        #ORDER MATTERS!!!!!!
        #//
        #ORDER MATTERS!!!!!!!!!!!

    seed_users()
    seed_stocks()
    seed_wallet()
    seed_portfolio()
    seed_watchlists()
    create_stock_history()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
        undo_stock_history()
        undo_watchlists()
        undo_portfolio()
        undo_wallet()
        undo_stocks()
        undo_users()
    # Add other undo functions here
