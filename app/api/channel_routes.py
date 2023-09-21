from flask import Blueprint, jsonify, session, request
from app.models import User, db, Server
from app.forms import ServerForm
from flask_login import current_user, login_required
from sqlalchemy import and_

channel_routes = Blueprint('channels', __name__)
