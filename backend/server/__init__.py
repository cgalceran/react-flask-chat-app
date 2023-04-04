from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

load_dotenv()
# Flask + CORS init
app = Flask(__name__, static_folder="../../dist", static_url_path="/") 
# changed "../../frontend/dist/" to "../../dist" for docker
CORS(app, resources={r'/api/*': {'origins': "*"}})

# Flask-JWT-Extended init
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)

# SocketIO init
app.config['SECRET_KEY'] = os.environ.get("SOCKET_SECRET_KEY")
socketio = SocketIO(app, cors_allowed_origins='*', logger=True)

# Database init
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_URL")
db = SQLAlchemy(app)    



from server import views






