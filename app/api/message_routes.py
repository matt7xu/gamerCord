from flask import Blueprint, jsonify, session, request
from app.models import User, db, Message
from flask_login import current_user, login_required
from app.forms import MessageForm

message_routes = Blueprint('messages', __name__)


# Get All Messages
@message_routes.route('/', methods=['GET'])
def getAllMessages():
    messages = Message.query.all()

    messages_info = []

    for each in messages:
        user_name = User.query.get(each.user_id)
        messages_info.append({
            'id': each.id,
            'content': each.content,
            'user_id': each.user_id,
            'channel_id': each.channel_id,
            'username': user_name.username,
            'createdAt': each.createdAt,
            'updatedAt': each.updatedAt
        })

    return {'messages': messages_info}


# Get Details of a Message from an Id
@message_routes.route('/<int:id>', methods=['GET'])
def messageDetails(id):
    message_Details = Message.query.get(id)
    if message_Details is None:
        return {'errors': ["Message couldn't be found"]}, 404

    ret = {
            'id': message_Details.id,
            'content': message_Details.content,
            'user_id': message_Details.user_id,
            'channel_id': message_Details.channel_id
    }

    return ret


# # Create a New Message
# @message_routes.route('/<int:id>/new', methods=['POST'])
# # @login_required
# def createMessage(id):
#     current_user_id = current_user.get_id()
#     new_content = request.json['content']

#     new = Message(
#         content=new_content,
#         user_id=current_user_id,
#         channel_id=id
#     )
#     db.session.add(new)
#     db.session.commit()
#     return new.to_dict()



# Edit a Message
@message_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def editMessage(id):

    message_edit = Message.query.get(id)

    #error response:
    if message_edit is None:
        return {'message': ["Message couldn\'t be found"]}, 404

    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # new_content = request.json['content']
        # message_edit.content=new_content
        message_edit.content=form.data['content']

        db.session.commit()
        return message_edit.to_dict()
    return {'errors': [form.errors]}, 401


# Delete a Message
@message_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deleteMessage(id):
    message_Delete = Message.query.get(id)
    if message_Delete is None:
        return {'errors': ["Message couldn't be found"]}, 404
    db.session.delete(message_Delete)
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200
