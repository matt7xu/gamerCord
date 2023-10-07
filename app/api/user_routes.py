from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    user_servers = user.servers
    ret= {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'vip': user.vip,
            'image': user.image,
            'servers': [each.to_dict() for each in user_servers]
    }
    return ret


# update vip
@user_routes.route('/<int:id>', methods=['PUT'])
def updateVip(id):
    user = User.query.get(id)
    user.vip = not user.vip
    db.session.commit()
    return user.to_dict()


@user_routes.route('/all', methods=['GET'])
# @login_required
def allusers():
    users = User.query.all()
    users_info = []

    for each in users:
        users_info.append({
            'id': each.id,
            'image': each.image,
            'vip': each.vip
        })

    return {'users': users_info}
