from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.helper import ALLOWED_EXTENSIONS

class ServerForm(FlaskForm):
    name = StringField('Name of the server', validators=[DataRequired()])
    # image = StringField('Image')
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    private = BooleanField('private')
    submit = SubmitField("Create Server")
