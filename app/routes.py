from flask import render_template, flash, redirect, url_for, request, jsonify
from app import app, db 
from app.forms import LoginForm, RegistrationForm, SystemCreation, HabitCreation
from flask_login import current_user, login_user, logout_user, login_required
from app.models import User, System, Habit
from werkzeug.urls import url_parse


'''Index'''
@app.route('/')
@app.route('/index')
@login_required
def index():
    rule = request.url_rule
    return render_template('index.html', title='Home', rule=rule)


'''Login'''
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))

    form = LoginForm()
    
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password.')
            return redirect(url_for('login'))

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
    

    # call get_trackers to update db with new tracking values
    
    return render_template('dashboard.html', title='Dashboard', systems=systems, data=data)


@app.route('/__tracking_bg_process')
def __tracking_bg_process():
    try:
        tracking_value = request.args.get('tracker')
        print("tracking_value: ", tracking_value)
        if tracking_value >= 0:
            return jsonify(result="You increased your streak!")
        else:
            return jsonify(result="Try again another day.")
    except Exception as e:
        return str(e)

    return render_template('dashboard.html')



'''Trial Function to retrieve habit progress'''
@app.route('/<username>/dashboard/interactive')
def interactive(username):
    try:
        return render_template('interactive.html')
    except Exception as e:
        return (str(e))

@app.route('/__background_process')
def __background_process():
    try: 
        lang = request.args.get('proglang')
        if str(lang).lower() == 'python':
            return jsonify(result='You are wise!')
        else:
            return jsonify(result='Try again.')
    except Exception as e:
        return (str(e))

    return render_template('interactive.html')


'''New System Form'''
@app.route('/<username>/create_system', methods=['GET', 'POST'])
@login_required
def create_system(username):

    form = SystemCreation()
    if form.validate_on_submit():
        system = System(title=form.title.data, descr=form.descr.data,
                        user_id=current_user.id)
        db.session.add(system)
        db.session.commit()
        flash('Congratulations, you have created a new system!')

        return redirect(url_for('dashboard', username=current_user.username))

    return render_template('create_system.html', title='New System', form=form)


'''New Habit Form'''
@app.route('/<username>/create_habit', methods=['GET', 'POST'])
@login_required
def create_habit(username):

    available_systems = System.query.filter_by(user_id=current_user.id)
    systems_list = [ (s.sid, s.title) for s in available_systems]

    form = HabitCreation()
    form.systemID.choices = systems_list

    if form.validate_on_submit():
        habit = Habit(title=form.title.data, goal=form.goal.data, system_id=form.systemID.data)
        db.session.add(habit)
        db.session.commit()
        flash('Congratulations, you have started a new habit!')

        return redirect(url_for('dashboard', username=current_user.username))

    return render_template('create_habit.html', title='New Habit', form=form)


# @app.route('/<username>/view_system', methods=['GET', 'POST'])
# @login_required
# def view_system(username):
#     # Full-view of existing system

#     # get systemid from overview
#     # query systemid

#     return render_template('view_system.html', title='View')



# @app.route('/<username>/update_habit', methods=['GET', 'POST'])
# def update_habit(username):

#     return 


'''

@app.route('/<username>/edit_system', methods=['GET', 'POST'])
@login_required
def edit_system(username):
    # Edits an existing system

    return


'''

