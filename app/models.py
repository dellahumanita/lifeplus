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
    title = db.Column(db.String(64), index=True)
    descr = db.Column(db.String(120), index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #Relationships
    users = db.relationship(User)
    habits = db.relationship('Habit', backref='system', lazy='dynamic')

    def __repr__(self):
        return '<System {}>'.format(self.sid)

class Habit(db.Model):
    ''' This represents a singular habit that the user creates for their system'''

    hid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64), index=True)
    progress = db.Column(db.Integer, index=True)
    system_id = db.Column(db.Integer, db.ForeignKey('system.sid'), nullable=False)

    def __repr__(self):
        return '<Habit {}>'.format(self.hid)


@login.user_loader 
def load_user(id):
    return User.query.get(int(id))


def main():
    print("\t--TESTING SPACE --\n")
    users = User.query.all()
    systems = System.query.all()
    habits = Habit.query.all()
    print("users = ", users)
    print("systems = ", systems)
    print("habits = ", habits)
    print('\n')

    della = User.query.get(1)
    nira = User.query.get(2)

    s4 = System(title="study routine", descr="#4", user_id=nira)
    db.session.add(s4)
    db.session.commit()
    print("\t> s3 has been added successfuly!")




main()


