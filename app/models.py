from datetime import datetime 
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    email = db.Column(db.String(90), primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    ## Relationships
    systems = db.relationship('System', backref='creator', lazy='dynamic')
    # tracker = db.relationship('Habit', backref='tracker', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
            self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class System(db.Model):
    sid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    descr = db.Column(db.String(120), index=True, unique=True)
    creator = db.Column(db.String(90), db.ForeignKey('user.email'), nullable=False)

    ## Relationships
    habits = db.relationship('Habit', backref='system', lazy=True)


    def __repr__(self):
        return '<System {}>'.format(self.sid)


class Habit(db.Model):
    hid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    progress = db.Column(db.Integer, index=True)
    goal = db.Column(db.Integer, index=True)

    ## Foreign keys as columns 
    sid = db.Column(db.Integer, db.ForeignKey('system.sid'), nullable=False)
    # tracker = db.Column(db.String(90), db.ForeignKey('user.email'), nullable=False)

    def __repr__(self):
        return '<Habit #{} for System #{} by User {}>'.format(self.hid, self.sid, self.tracker)

    

@login.user_loader 
def load_user(id):
    return User.query.get(int(id))