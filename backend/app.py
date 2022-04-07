from flask import Flask , render_template , url_for , request , session , redirect
#import pymongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'SmartLab'
app.config['MONGO_URI'] = 'mongodb://127.0.0.1/27017/SmartLab'

#mongo = pymongo.PyMongo(app)

@app.route('/')

def index():
    if 'username' in session:
        return "You're logged in as " + session['username']

    return render_template('login.html')

@app.route('/login' , methods = ['POST'])

def login():
    users = mongo.db.users
    login_user = users.find_one({'username' : request.form['username']})
    
    if login_user:
        if login_user['password'] == request.form['password']:
            session['username'] = request.form['username']
            return redirect(url_for('index'))

        return 'Invalid Username or Password!!!'


if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)