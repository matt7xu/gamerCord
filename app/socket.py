from flask_socketio import SocketIO, emit
import os
from app.models import User, db, Message, Reaction
from flask_login import current_user


# configure cors_allowed_origins
origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
    current_user_id = current_user.get_id()
    new = Message(
        content=data['content'],
        user_id=current_user_id,
        channel_id=data['channelId'],
        username=data['username'],
        createdAt = db.func.now()
    )
    db.session.add(new)
    db.session.commit()

@socketio.on("emoj")
def handle_emoj(data):
    emit("emoj", data, broadcast=True)
    current_user_id = current_user.get_id()
    new = Reaction(
        content=data['content'],
        user_id=current_user_id,
        message_id=data['messageId'],
    )
    db.session.add(new)
    db.session.commit()
