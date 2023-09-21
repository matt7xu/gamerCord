from flask import Blueprint, jsonify, session, request
from app.models import User, db, Server
from app.forms import ServerForm
from flask_login import current_user, login_required
from sqlalchemy import and_

message_routes = Blueprint('messages', __name__)
