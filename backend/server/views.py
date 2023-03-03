from server import app, db, socketio
from flask import request
from .models import User



# ====================================================
# Static Serving
# ====================================================

# @app.route('/api')
# def getIndex():
#     return "<p>Hello, World!</p>"    

# ====================================================
# Users
# ====================================================

# Create User
@app.post("/api/users/create")
def user_create():
    return User.create_user('Carlos', 'Galceran', 'cargalceran@gmail.com', '12345')

# Get list of users
@app.get('/api/users')
def handle_users():
    return User.get_users()


# Get Individual user
# @app.get('/api/users/<id>')
# def handleSingleUsers(id):
#     return list(users)

# ====================================================
# Messages
# ====================================================

# @app.route('/api/messages', methods=['GET', 'POST'])
# def handleMessages():
#     messages = []
#     for user in users:
#         for data in user['messages']:
#             messages.append(data)
#     return "messages" 



# Test = receive message from hook in Login app on Client
@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)