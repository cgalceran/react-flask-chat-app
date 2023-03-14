from server import app, socketio
from flask import request, jsonify
from .models import User, Messages
import bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

logged_in_users = []

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
    firstname = request.json.get('firstname')
    lastname = request.json.get('lastname')
    email = request.json.get('email')
    password = request.json.get('password')
    encoded_password = password.encode('utf-8')
    hashed_password = bcrypt.hashpw(encoded_password, bcrypt.gensalt())
    return User.create_user(firstname, lastname, email, hashed_password.decode('utf8')) #had to decode hashed password to insert in db

# Get list of users from db
@app.get('/api/users')
def handle_users():
    return User.get_users()

# Get Individual user from db
@app.get('/api/users/<email>')
def handle_single_user(email):
    user = User.get_user(email)
    if user != 'User does not exist':
        return user
    else:
        return 401

# ====================================================
# Messages
# ====================================================

# Get all messages from db
@jwt_required()
@app.get('/api/messages')
def handle_messages():
    return Messages.get_messages()

#create a message and save on db
@app.post('/api/messages')
def message_create():
    message = request.json.get('message')
    email = request.json.get('email')
    user_id = (handle_single_user(email))['_id']
    return Messages.create_message(message, user_id)


# ====================================================
# Login
# ====================================================

@app.post('/api/login')
def handle_login():
    email = request.json.get('email')
    password = str(request.json.get('password'))
    user = handle_single_user(email)
    if user != 401:
        stored_password = str(user['password'])
    else:
        return "User not found"
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        access_token = create_access_token(identity=email)
        log_user = {
            "firstname": user['firstname'],
            "lastname": user['lastname'],
            "email": user['email'], 
        }
        logged_in_users.append(log_user)
        return jsonify(access_token=access_token)
    else:
        return "Incorrect password"
    
#Get list of active users from array
@jwt_required()
@app.get('/api/users/active')
def handle_logged_users():
    return logged_in_users

# Test = receive message from hook in Login app on Client
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('connection')
def on_connection():
    print('a user connected')


