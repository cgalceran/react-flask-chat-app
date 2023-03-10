from server import app, socketio
from flask import request, jsonify
from .models import User, Messages
import bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



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
    return User.create_user(firstname, lastname, email, hashed_password.decode('utf8'))

# Get list of users
@app.get('/api/users')
def handle_users():
    return User.get_users()


# Get Individual user
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

@app.get('/api/messages')
def handle_messages():
    return Messages.get_messages()



@app.post('/api/messages')
def message_create():
    message = request.args.get('message')
    email = request.args.get('email')
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
    if user is not 401:
        stored_password = str(user['password'])
    else:
        return "User not found"
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)
    else:
        return "Incorrect password"

@app.post('/api/token')
def create_token():
    email = request.json.get('email')
    password = request.json.get('password')
    if email != "test@test.com" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401
    


# Test = receive message from hook in Login app on Client
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)



