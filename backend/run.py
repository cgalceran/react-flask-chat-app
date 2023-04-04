from server import app
from server import socketio

if __name__ == '__main__':
    socketio.run(app, debug=True)
    from gevent import monkey
    monkey.patch_all()


