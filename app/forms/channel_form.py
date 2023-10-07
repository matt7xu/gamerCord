from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, SubmitField
from wtforms.validators import DataRequired

class ChannelForm(FlaskForm):
    name = StringField('Name of the server', validators=[DataRequired()])
    private = BooleanField('private')
    submit = SubmitField("Create Channel")
