from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    name = StringField('Name of the server', validators=[DataRequired()])
    image = StringField('Image', validators=[DataRequired()])
    private = RadioField('Private', validators=[DataRequired()])
    submit = SubmitField("Create Server")
