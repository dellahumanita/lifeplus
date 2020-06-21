from datetime import datetime 
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    '''This represents a user on the site'''

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    #Relationships
    systems = db.relationship('System', backref='creator', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
            self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class System(db.Model):
    '''This represents a system that a user has created to store their habits'''

    sid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, )
    descr = db.Column(db.String(120), index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.Boolean)
    date_created = db.Column(db.DateTime)

    #Relationships
    users = db.relationship(User)
    habits = db.relationship('Habit', backref='parent', lazy='dynamic')

    def __repr__(self):
        return '<System {} | User {}>'.format(self.title, self.user_id)

    # renames the title of the system
    def rename(self, new):
        self.title = self.new

    # edits the description of the system
    def edit(self, text):
        self.descr = text 

class Habit(db.Model):
    ''' This represents a singular habit that the user creates for their system'''

    hid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    progress = db.Column(db.Integer, index=True)
    goal = db.Column(db.Integer, index=True)
    system_id = db.Column(db.Integer, db.ForeignKey('system.sid'), nullable=False)

    def __repr__(self):
        return '<Habit {} | System {}>'.format(self.title, self.system_id)

    # renames the title of the habit
    def rename(self, new):
        self.title = new

    # checks to see if user has met their goal
    def pass_goal(self):
        if self.progress == self.goal:
            return True
        return False

    # increase streak
    def increment(self):
        self.progress = self.progress + 1 

    # decrease streak
    def decrement(self):
        self.progress = self.progress - 1

    # reset streak
    def reset(self):
        self.progress = 0




@login.user_loader 
def load_user(id):
    return User.query.get(int(id))




