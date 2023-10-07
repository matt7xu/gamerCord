from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, BooleanField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    name = StringField('Name of the server', validators=[DataRequired()])
    image = StringField('Image')
    private = BooleanField('private')
    submit = SubmitField("Create Server")
