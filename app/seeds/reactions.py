from app.models import db, Reaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reactions():
    r1 = Reaction(
        content='smile', user_id= 1, message_id=1
    )
    r2 = Reaction(
        content='joy', user_id= 1,  message_id=2
    )
    r3 = Reaction(
        content='wink', user_id= 2,  message_id=1
    )
    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.commit()

def undo_reactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reactions"))

    db.session.commit()
