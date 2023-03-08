from server import app, db, socketio
from flask import request
from .models import User, Messages
import bcrypt



# ====================================================
# Static Serving
# ====================================================

# @app.route('/')
# def getIndex():
#     return "<p>Hello, World!</p>"    

# ====================================================
# Users
# ====================================================

# Create User
@app.post("/api/users/create")
def user_create():
    email = request.args.get('email')
    firstname = request.args.get('firstname')
    lastname = request.args.get('lastname')
    password = request.args.get('password')
    encoded_password = password.encode('utf-8')
    hashed_password = bcrypt.hashpw(encoded_password, bcrypt.gensalt())
    return User.create_user(firstname, lastname, email, hashed_password)

# Get list of users
@app.get('/api/users')
def handle_users():
    return User.get_users()


# Get Individual user
@app.get('/api/users/<email>')
def handleSingleUsers(email):
    user = User.get_user(email)
    if user != 'User does not exist':
        return user
    else:
        return 'User does not exist', 404

# ====================================================
# Messages
# ====================================================

@app.get('/api/messages')
def handle_messages():
    return Messages.get_messages()



@app.post('/api/messages')
def message_create():
    message = request.args.get('message')
    email = request.args.get('email')
    user_id = (handleSingleUsers(email))['_id']
    return Messages.create_message(message, user_id)



# Test = receive message from hook in Login app on Client
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)