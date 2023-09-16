from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    s1 = Server(
        name='League of Legends', user_id= 1, image= 'https://res.cloudinary.com/dmdiqj57t/image/upload/v1694896867/LoL_icon.svg_z0xivn.png', private=False
    )
    s2 = Server(
        name='Call of Duty', user_id= 1, image= 'https://res.cloudinary.com/dmdiqj57t/image/upload/v1694896865/Call-of-Duty-Logo-2010-2011_fqyi8h.png', private=False
    )
    s3 = Server(
        name='World of Warcraft', user_id= 2, image= 'https://res.cloudinary.com/dmdiqj57t/image/upload/v1694896942/world-of-warcraft-logo-png-transparent_ihmg9s.png', private=False
    )
    db.session.add(s1)
    db.session.add(s2)
    db.session.add(s3)
    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))

    db.session.commit()
