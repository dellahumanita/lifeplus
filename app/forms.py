from flask_wtf import FlaskForm 
from wtforms import StringField, PasswordField, BooleanField, SubmitField, TextAreaField 
from wtforms.validators import DataRequired, ValidationError, Email, EqualTo
from app.models import User, System, Habit

'''                                                

        Stores all the classes needed to create forms 

'''                        


'''Existing User Login'''
class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In') 


'''New Users Registration'''
class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField(
        'Repeat Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Register')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Please use a different username.')
    
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Please use a different email.')


'''Create a new system'''
class SystemCreation(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    descr = TextAreaField('Description', validators=[DataRequired()])
    confirm = SubmitField('Save')

    # checks to see if a system with the same title is already existing
    def validate_title(self, title):
        #TODO: filter by user-id, then by title
        search = System.query.filter_by(title=title.data).first()
        if search is not None:
            raise ValidationError('Please use a different title.')


'''Create a new habit'''
class HabitCreation(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])

    def validate_title(self, title):
        #TODO: filter by user-id, then by title
        search = Habit.query.filter_by(title=title.data)
        if search is not None:
            raise ValidationError('Please use a different title.')



