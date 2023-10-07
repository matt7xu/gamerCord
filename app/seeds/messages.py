from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_messages():
    m1 = Message(
        content='any bronze players', user_id= 1, channel_id=1, username='PeterGriffin', createdAt= datetime(2023,10,1), updatedAt= datetime(2023,10,1)
    )
    m2 = Message(
        content='i know how u feel', user_id= 2, channel_id=1, username='Stewart', createdAt= datetime(2023,10,1), updatedAt= datetime(2023,10,1)
    )
    m3 = Message(
        content='Helloooo World', user_id= 3, channel_id=1, username='MegGriffin', createdAt= datetime(2023,10,1), updatedAt= datetime(2023,10,1)
    )
    db.session.add(m1)
    db.session.add(m2)
    db.session.add(m3)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
