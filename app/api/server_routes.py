from flask import Blueprint, jsonify, session, request
from app.models import User, db, Server, users_servers
from app.forms import ServerForm
from flask_login import current_user, login_required
from sqlalchemy import and_
from app.api.helper import upload_file_to_s3, get_unique_filename

server_routes = Blueprint('servers', __name__)

# Get All Servers
@server_routes.route('/', methods=['GET'])
def getAllServers():
    servers = Server.query.all()

    server_info = []

    for each in servers:
        server_info.append({
            'id': each.id,
            'name': each.name,
            'image': each.image,
            'private': each.private,
            'user_id': each.user_id
        })

    return {'servers': server_info}


# Get Details of a Server from an Id
@server_routes.route('/<int:id>', methods=['GET'])
def serverDetails(id):
    server_Details = Server.query.get(id)
    if server_Details is None:
        return {'errors': ["Server couldn't be found"]}, 404

    ret = {
            'id': server_Details.id,
            'name': server_Details.name,
            'image': server_Details.image,
            'private': server_Details.private,
            'user_id': server_Details.user_id
    }

    return ret


# Get All Servers Owned by Current User
@server_routes.route('/owned', methods=["GET"])
def serversOwned():
    current_user_id = current_user.get_id()
    owned = Server.query.filter(Server.user_id == current_user_id)
    return jsonify({'Servers': [each.to_dict() for each in owned]})


# Create a New Server
@server_routes.route('/new', methods=['POST'])
# @login_required
def createServer():
    form = ServerForm()
    # print("$$$$$$$$", form.data['private'])
    current_user_id = current_user.get_id()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        image_file = form.image.data

        if image_file == None:
            url_image = ""
        else:
            image_filename = get_unique_filename(image_file.filename)
            upload = upload_file_to_s3(image_file, image_filename)

            if "url" not in upload:
                return {'errors': 'Failed to upload'}

            url_image = upload["url"]

        new = Server(
            name=form.data['name'],
            image=url_image,
            private=form.data['private'],
            user_id=current_user_id
        )
        db.session.add(new)
        db.session.commit()
        return new.to_dict()
    return {'errors': [form.errors]}, 401


# Edit a Server
@server_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def editServer(id):

    server = Server.query.get(id)
    current_user_id = int(current_user.get_id())

    #error response:
    if server is None:
        return {'message': ["server couldn\'t be found"]}, 404

    if server.user_id != current_user_id:
        return {'errors': ['Forbidden: You don\'t have permission']}, 403

    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        server.name=form.data['name']
        server.image=form.data['image']
        server.private=form.data['private']

        db.session.commit()
        return server.to_dict()
    return {'errors': [form.errors]}, 401


# Delete a Server
@server_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deleteServer(id):
    server_Delete = Server.query.get(id)
    if server_Delete is None:
        return {'errors': ["Server couldn't be found"]}, 404
    db.session.delete(server_Delete)
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200


# user join to an server
@server_routes.route('/<int:serverId>/user/<int:userId>', methods=["POST"])
# @login_required
def userJoinServer(serverId, userId):
    join_server = users_servers.insert().values(
        user_id=userId, server_id=serverId
    )
    db.session.execute(join_server)
    db.session.commit()

    user = User.query.get(userId)
    if user is None:
        return {'errors': ["User couldn't be found"]}, 404

    user_servers = user.servers

    ret = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'vip': user.vip,
            'image': user.image,
            'servers': [each.to_dict() for each in user_servers]
    }

    return ret


# user quit server
@server_routes.route('/<int:serverId>/user/<int:userId>', methods=["DELETE"])
# @login_required
def userQuitServer(userId, serverId):
    db.session.query(users_servers).filter(and_(users_servers.c.user_id == userId, users_servers.c.server_id == serverId)).delete()
    db.session.commit()
    return {'message':  "Successfully quitted"}, 200
