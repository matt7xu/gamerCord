from app.models import db, users_servers, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users_servers():
    us1 = users_servers.insert().values(
        user_id= 1, server_id=1
    )
    us2 = users_servers.insert().values(
        user_id= 1, server_id=2
    )
    us3 = users_servers.insert().values(
        user_id= 2, server_id=3
    )
    db.session.execute(us1)
    db.session.execute(us2)
    db.session.execute(us3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users_servers"))

    db.session.commit()
