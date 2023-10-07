from flask import Blueprint, jsonify, session, request
from app.models import User, db, Reaction
from flask_login import current_user, login_required

reaction_routes = Blueprint('reactions', __name__)


# Get All Reaction
@reaction_routes.route('/', methods=['GET'])
def getAllReactions():
    reactions = Reaction.query.all()

    reactions_info = []

    for each in reactions:
        reactions_info.append({
            'id': each.id,
            'content': each.content,
            'user_id': each.user_id,
            'message_id': each.message_id
        })

    return {'reactions': reactions_info}


# Get Details of a Reaction from an Id
@reaction_routes.route('/<int:id>', methods=['GET'])
def reactionDetails(id):
    reaction_Details = Reaction.query.get(id)
    if reaction_Details is None:
        return {'errors': ["Reaction couldn't be found"]}, 404

    ret = {
            'id': reaction_Details.id,
            'content': reaction_Details.content,
            'user_id': reaction_Details.user_id,
            'message_id': reaction_Details.message_id
    }

    return ret


# Create a New Reaction
@reaction_routes.route('/<int:id>/new', methods=['POST'])
# @login_required
def createReaction(id):
    current_user_id = current_user.get_id()
    new_content = request.json['content']

    new = Reaction(
        content=new_content,
        user_id=current_user_id,
        message_id=id
    )
    db.session.add(new)
    db.session.commit()
    return new.to_dict()



# Edit a Reaction
@reaction_routes.route('/<int:id>', methods=['PUT'])
# @login_required
def editReaction(id):

    reaction_edit = Reaction.query.get(id)

    #error response:
    if reaction_edit is None:
        return {'message': ["Reaction couldn\'t be found"]}, 404
    new_content = request.json['content']
    reaction_edit.content=new_content

    db.session.commit()
    return reaction_edit.to_dict()


# Delete a Reaction
@reaction_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def deleteReaction(id):
    reaction_Delete = Reaction.query.get(id)
    if reaction_Delete is None:
        return {'errors': ["Reaction couldn't be found"]}, 404
    db.session.delete(reaction_Delete)
    db.session.commit()
    return {'message':  "Successfully deleted"}, 200
