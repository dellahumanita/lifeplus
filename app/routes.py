from flask import render_template
from app import app 

@app.route('/')
@app.route('/index')
def index():
    user = {'username' : 'Della'}
    return render_template('index.html', title='Home', user=user)