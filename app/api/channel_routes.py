from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel
from app.forms import ChannelForm
from flask_login import current_user, login_required


channel_routes = Blueprint('channels', __name__)

# Get All Channels
@channel_routes.route('/', methods=['GET'])
def getAllChannels():
    channels = Channel.query.all()

    channel_info = []

    for each in channels:
        channel_info.append({
            'id': each.id,
            'name': each.name,
            'private': each.private,
            'server_id': each.server_id
        })

    return {'channels': channel_info}


# Get Details of a Channel from an Id
@channel_routes.route('/<int:id>', methods=['GET'])
def channelDetails(id):
    channel_Details = Channel.query.get(id)
    if channel_Details is None:
        return {'errors': ["Channel couldn't be found"]}, 404

    ret = {
            'id': channel_Details.id,
            'name': channel_Details.name,
            'private': channel_Details.private,
            'server_id': channel_Details.server_id
    }

    return ret


# Create a New Channel
@channel_routes.route('/<int:id>/new', methods=['POST'])
# @login_required
def createChannel(id):
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new = Channel(
            name=form.data['name'],
            private=form.data['private'],
            server_id=id
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()
    return {'errors': [form.errors]}, 401


# Edit a Channel
@channel_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def editChannel(id):

    server = Channel.query.get(id)

    #error response:
    if server is None:
        return {'message': ["Channel couldn\'t be found"]}, 404

    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        server.name=form.data['name']
        server.private=form.data['private']

        db.session.commit()
        return server.to_dict()
    return {'errors': [form.errors]}, 401


# Delete a Channel
@channel_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deleteChannel(id):
    channel_Delete = Channel.query.get(id)
    if channel_Delete is None:
        return {'errors': ["Channel couldn't be found"]}, 404
    db.session.delete(channel_Delete)
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200
