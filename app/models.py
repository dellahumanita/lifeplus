from datetime import datetime 
from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    email = db.Column(db.String(90), primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    ## Relationships
    systems = db.relationship('System', backref='user', lazy=True)
    trackers = db.relationship('Tracker', backref='user', lazy=True)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_password(self, password):
            self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class System(db.Model):
    __tablename__: 'systems'
    sid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    descr = db.Column(db.String(120), index=True, unique=True)

    ## Relationships
    habits = db.relationship('Habit', backref='system', lazy=True)

    ## Foreign keys as columns 
    creator = db.Column(db.String(90), db.ForeignKey('user.email'), nullable=False)

    def __repr__(self):
        return '<System {}>'.format(self.sid)


class Habit(db.Model):
    __tablename__ = 'habits'
    hid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True, unique=True)
    progress = db.Column(db.Integer, index=True, unique=True)

    ## Relationships
    trackers = db.relationship('Tracker', backref='tracker', lazy=True)

    ## Foreign keys as columns 
    sid = db.Column(db.Integer, db.ForeignKey('system.sid'), nullable=False)

    def __repr__(self):
        return '<Habit {}>'.format(self.hid)


class Tracker(db.Model):
    __tablename__ = 'trackers'
    hid = db.Column(db.Integer, db.ForeignKey('habits.hid'),
                    nullable=False, primary_key=True)
    tracking_by = db.Column(db.String(90), db.ForeignKey('user.email'),
                            nullable=False)

    def __repr__(self):
        return '<Habit {}; by User {}>'.format(self.hid, self.tracking_by)

    

@login.user_loader 
def load_user(id):
    return User.query.get(int(id))