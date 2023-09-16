from app.models import db, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    c1 = Channel(
        name='general', server_id= 1, private=False
    )
    c2 = Channel(
        name='looking-for-group', server_id= 1, private=False
    )
    c3 = Channel(
        name='looking-for-ranked', server_id= 1, private=False
    )
    c4 = Channel(
        name='general', server_id= 2, private=False
    )
    c5 = Channel(
        name='general', server_id= 3, private=False
    )
    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))

    db.session.commit()
