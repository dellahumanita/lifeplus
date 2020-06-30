from flask import render_template, flash, redirect, url_for, request
from app import app, db 
from app.forms import LoginForm, RegistrationForm, SystemCreation, HabitCreation
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, System, Habit
from werkzeug.urls import url_parse


'''Global Variables'''
current_system = None


'''Index'''
@app.route('/')
@app.route('/index')
@login_required # protects views against anonymous users
def index():
    return render_template('index.html', title='Home')


'''Login'''
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()
    
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()

        # takes the password has stored with the user and determine if
        #  password entered matches the hash 
        #  if either username is invalid or password is incorrect, do
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password.')
            return redirect(url_for('login'))

        # if both username and password and correct 
        #   CONDITIONS  :
        #       1. URL does not have a next argument:
        #           - redirected to index page
        #       2. URL includes a next argument set to a relative path:
        #           - redirected to that URL
        #       3. URL includes a next argument that includes a domain name::
        #           - redirected to index page to ensure security from 
        #               malicious sites 

        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('index')
        
        return redirect(next_page)

    return render_template('login.html', title='Sign In', form=form)


'''Logout'''
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


'''Register'''
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)


'''WIP'''
# Temporary page to display missing features 
@app.route('/wip')
def wip():
    return render_template('wip.html')


'''Dashboard'''
@app.route('/<username>/dashboard')
@login_required
def dashboard(username):
    '''This page shows the user an overview of all existing systems and habits'''
    
    systems = System.query.filter_by(user_id=current_user.id).all()

    data = dict()
    for system in systems:
        habits = []
        hquery = Habit.query.filter_by(system_id=system.sid).all()
        if hquery is not None:
            for habit in hquery:
                habits.append(habit)
        else:
            raise Exception('No habits found.')
        data[system] = habits
        
    
    return render_template('dashboard.html', title='Dashboard', systems=systems, data=data)


@app.route('/<username>/create_system', methods=['GET', 'POST'])
@login_required
def create_system(username):
    '''Create a new system'''

    form = SystemCreation()
    if form.validate_on_submit():
        system = System(title=form.title.data, descr=form.descr.data,
                        user_id=current_user.id)
        db.session.add(system)
        db.session.commit()
        flash('Congratulations, you have created a new system!')

        global current_system
        current_system = system

        return redirect(url_for('dashboard', username=current_user.username))


    return render_template('create_system.html', title='New System', form=form)


@app.route('/<username>/create_habit', methods=['GET', 'POST'])
@login_required
def create_habit(username):
    '''Create a new habit for the selected system'''

    form = HabitCreation()
    if form.validate_on_submit():
        habit = Habit(title=form.title.data, goal=form.goal.data, system_id=current_system.id)
        db.session.add(system)
        db.session.commit()
        flash('Congratulations, you have started a new habit!')

        return redirect(url_for('dashboard', username=current_user.username))

    return render_template('create_habit.html', title='New Habit', form=form)


'''
#TODO
@app.route('/<username>/dashboard/<system.title>')
@login_required
def system_view(sid):
    # This page allows the user to have a full-view of their selected system

    system_id = System.query.filter_by(sid=sid).first_or_404()
    habits = Habit.query.filter_by(system_id=system_id).first()

    return 





@app.route('/<username>/dashboard/<system.title>/new-habit')
@login_required
def create_habit():
    return 
'''


