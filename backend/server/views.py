from server import app, socketio 
from flask import request, send_from_directory, jsonify
from datetime import timedelta
from .models import User, Messages
import bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required

logged_in_users = []

# ====================================================
# Static Serving
# ====================================================

@app.route('/')
def getIndex():
    return app.send_static_file("index.html")

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

#Get list of active users from array
@jwt_required(optional=True)
@app.get('/api/users/active')
def handle_logged_users():
    logged_in_users = User.get_loggedin_users()
    return logged_in_users   

# Get list of users from db
@app.get('/api/users')
def handle_users():
    return User.get_users()

# Get Individual user from db
@jwt_required(optional=True)
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
@jwt_required()
@app.post('/api/messages')
def message_create():
    message = request.json.get('message')
    email = request.json.get('email')
    user_id = (handle_single_user(email))['_id']
    User.user_last_login(email)
    return Messages.create_message(message, user_id)


# ====================================================
# Login and Logout
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
        jwt_data = {
            "email": user['email'],
            "firstname": user['firstname'],
            "lastname": user['lastname'],
        }
        print("Data from JWT ---->", jwt_data)
        access_token = create_access_token(identity=jwt_data, fresh=timedelta(hours=24))
        User.user_last_login(email)
        socketio.emit('logged_in_users', handle_logged_users(), broadcast=True)
        print("This is the access token: --->", access_token)
        return jsonify(access_token=access_token)
    else:
        return "Incorrect password"
    
@jwt_required()
@app.post('/api/logout')
def handle_logout():
    email = request.json.get('email')
    logged_in_users = handle_logged_users()
    for i in range(len(logged_in_users)):
        if logged_in_users[i]['email'] == email:
            del logged_in_users[i]
            break
    socketio.emit('logged_in_users', logged_in_users , broadcast=True)
    return logged_in_users


# ====================================================
# Websockets
# ====================================================
     
@socketio.on("connect")
def handle_connection():
    print("User Connected: ", request.sid)

@socketio.on('created a message')
def handle_created_message():
    data = Messages.get_messages() # I avoided using JWTs on this one
    socketio.emit('receive_db_messages', data, broadcast=True)

@socketio.on("disconnect")
def handle_disconnect():
    print("User Disconnected: ", request.sid)
    
