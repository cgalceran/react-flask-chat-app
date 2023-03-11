from server import app, db
from datetime import datetime


# -------User Class --------------------------------------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())

    def get_users():
        data = User.query.all()
        user = []
        for element in data:
            dict = {
                '_id': element.id,
                'firstname': element.firstname,
                'lastname': element.lastname,
                'email': element.email,
                'password': element.password,
                'created_at': element.created_at.strftime("%m/%d/%Y-%H:%M:%S")
            }
            user.append(dict)

        return user
    
    def get_user(email):
        data = User.query.filter_by(email=email).first()
        if data == None:
            return 'User does not exist'
        return {'_id': data.id,
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'password': data.password,
                'created_at': data.created_at.strftime("%m/%d/%Y-%H:%M:%S")
            }
  
    def create_user(firstname,lastname, email, password):
        check_if_email_exists = User.query.filter_by(email=email).first()
        if check_if_email_exists == None:
                        #true
            user = User(firstname=firstname, lastname=lastname, email=email, password=password)
            db.session.add(user)
            db.session.commit()
            print('Created User:', firstname, 'with email:',email)
            return '% r' % User.query.filter_by(email=email).first()            
        else:
            if email != check_if_email_exists.email:
                        #true
                user = User(firstname=firstname, lastname=lastname, email=email, password=password)
                db.session.add(user)
                db.session.commit()
                print('Created User:', firstname, 'with email:',email)
                return '% r' % User.query.filter_by(email=email).first()                         
            else:
                return 'User already exists'    

    def __repr__(self):
        return '<User %r>' % self.firstname

# ------- Messages Class -------------------------------------------

class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(400), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def get_messages():
        data = Messages.query.all()
        message = []
        for element in data:
            dict = {
                '_id': element.id,
                'message': element.message,
                'username': User.query.filter_by(id=element.user_id).first().firstname + " " +User.query.filter_by(id=element.user_id).first().lastname,
                'created_at': element.created_at.strftime("%m/%d/%Y-%H:%M:%S")
            }
            message.append(dict)

        return message

    def create_message(message, user_id):
        if user_id != None:
            message = Messages(message=message, user_id=user_id)
            db.session.add(message)
            db.session.commit()
            return '% r' % User.query.filter_by(id=user_id).first()  

    def __repr__(self):
        return '<Message %r>' % self.id
    

with app.app_context():
    db.create_all()

  




