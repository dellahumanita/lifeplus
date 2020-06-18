from app import app, db
from app.models import User, System, Habit

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 
        'System': System, 'Habit': Habit}