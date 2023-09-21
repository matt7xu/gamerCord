from flask_wtf import FlaskForm
from wtforms import StringField, RadioField, SubmitField
from wtforms.validators import DataRequired

class ServerForm(FlaskForm):
    name = StringField('Name of the server', validators=[DataRequired()])
    image = StringField('Image')
    private = RadioField('Private', coerce=bool, choices=[(True, 'True'), (False, 'False')])
    submit = SubmitField("Create Server")

