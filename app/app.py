#app.py
from flask import Flask, render_template, request, json, redirect, session
from flask_mongoengine import MongoEngine #ModuleNotFoundError: No module named 'flask_mongoengine' = (venv) C:\flaskmyproject>pip install flask-mongoengine
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
 
app = Flask(__name__)
app.secret_key = "smartLab-2022"
 
app.config['MONGODB_SETTINGS'] = {
    'db': 'SmartLab',
    'host': 'localhost',
    'port': 27017
}
db = MongoEngine()
db.init_app(app)
 
class User(db.Document):
    firstName = db.StringField()
    lastName = db.StringField()
    email = db.StringField()
    password = db.StringField()
    reg_date = db.DateTimeField(datetime.now)
     
@app.route('/')
def main():
    return render_template('index.html')
     
@app.route('/signUp',methods=['POST','GET'])
def signUp():   
    today = datetime.today()    
    if request.method == 'POST':
        print("inside if")
        _fname = request.form['fname']
        _lname = request.form['lname']
        _email = request.form['inputEmail']
        _password = request.form['inputPassword']
        # validate the received values
        if _fname and _email and _password:
            _hashed_password = generate_password_hash(_password)
            _users = User.objects(email=_email).first()
            if not _users:
                usersave = User(firstName=_fname,lastName=_lname, email=_email, password=_hashed_password, reg_date=today)
                usersave.save()
                msg =  '{ "html":"ok"}'
                msghtml = json.loads(msg)
                return msghtml["html"]
            else:
                msg =  '{ "html":"<h3>A user with this email address already exists</h3>"}'
                msghtml = json.loads(msg)
                return msghtml["html"]
        else:
            msg =  '{ "html":"<h3>Enter the required fields</h3>"}'
            msghtml = json.loads(msg)
            return msghtml["html"]
    else:
        return render_template("signup.html")
 
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        # Get Form Fields
        _username = request.form['inputEmail']
        _password = request.form['inputPassword']
        # Get user by username
        users = User.objects(email=_username).count() 
        print(users) # result 1
        if users > 0:
            # Get stored hash
            user_rs = User.objects(email=_username).first()
            password = user_rs['password']
            print(password)
            # Compare Passwords 
            if check_password_hash(password, _password):
                # Passed
                session['sessionusername'] = _username
                return redirect('/userHome')
            else:
                error = 'Invalid login'
                return render_template('signin.html', error=error)
        else:
            error = 'Username not found'
            return render_template('signin.html', error=error)
    
    return render_template('signin.html')
     
@app.route('/userHome')
def userHome():
    print(session.get('sessionusername'))   
    if session.get('sessionusername'):
        return render_template('userHome.html')
    else:
        return render_template('error.html',error = 'Unauthorized Access')
 
@app.route('/logout')
def logout():
    session.pop('sessionusername', None)
    return redirect('/')
     
if __name__ == '__main__':
    app.run(debug=True)