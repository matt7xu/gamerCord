from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# join table
users_servers = db.Table("users_servers",
                       db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
                       db.Column("server_id", db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), primary_key=True)
                       )
if environment == "production":
        users_servers.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    vip = db.Column(db.Boolean, default=False)
    image = db.Column(db.String(255))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'vip': self.vip,
            'image': self.image
        }

    # relationships
    #one-to-many
    # 1. servers.userId
    servers_user = db.relationship("Server", back_populates="user_servers")
    # 2. Messages.userId
    messages_user = db.relationship("Message", back_populates="user_messages")
    # 3. Reactions.userId
    reactions_user = db.relationship("Reaction", back_populates="user_reactions")
    #many-to-many
    # 4. users_servers.userId
    servers = db.relationship("Server", secondary=users_servers, back_populates="users")


class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    image = db.Column(db.String(255))
    private = db.Column(db.Boolean, default=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image': self.image,
            'private': self.private,
            'user_id': self.user_id
        }

    # relationships
    #one-to-many
    # 1. channels
    channels_server = db.relationship("Channel", back_populates="server_channels", cascade='all, delete')
    # 2. user
    user_servers = db.relationship("User", back_populates="servers_user")
    #many-to-many
    # 3. user
    users = db.relationship("User", secondary=users_servers, back_populates="servers")


class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    private = db.Column(db.Boolean, default=False, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'private': self.private,
            'server_id': self.server_id
        }

    # relationships
    #one-to-many
    # 1.server
    server_channels = db.relationship("Server", back_populates="channels_server")
    # 2.message
    messages_channel = db.relationship("Message", back_populates="channel_messages", cascade='all, delete')

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(40), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'username': self.username,
            'channel_id': self.channel_id,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }

    # relationships
    #one-to-many
    # 1. user
    user_messages = db.relationship("User", back_populates="messages_user")
    # 2. channel
    channel_messages = db.relationship("Channel", back_populates="messages_channel")
    # 3. reaction
    reactions_message = db.relationship("Reaction", back_populates="message_reactions", cascade='all, delete')


class Reaction(db.Model):
    __tablename__ = 'reactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(40), nullable=False, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('messages.id')), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'user_id': self.user_id,
            'message_id': self.message_id
        }

    # relationships
    #one-to-many
    # 1. user
    user_reactions = db.relationship("User", back_populates="reactions_user")
    # 2. message
    message_reactions = db.relationship("Message", back_populates="reactions_message")
