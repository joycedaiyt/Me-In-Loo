from back_end import cursor, cnxn
from flask import request, Response, Blueprint, session
from werkzeug.security import check_password_hash, generate_password_hash

# In Flask, a blueprint is just a group of related routes (the functions below), it helps organize your code
routes = Blueprint('api', __name__)

@routes.route('/users', methods=['GET'])
def handleLogin():
    # Retrieve user entered login info
    content = request.json
    email = content['email']
    password = content['password']

    # Fetch user from database
    select_stmt = "SELECT * FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    user = cursor.fetchone()

    # If User exists
    if user:
        # Get existing user password
        hashed_password = user[1]

        if check_password_hash(hashed_password, password):
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['email'] = user[0]
            return Response("good", status=200, mimetype='application/json')
        else:
            return Response("Incorrect password", status=400)
    else:
        return Response("Incorrect username", status=400)


@routes.route('/users', methods=['POST'])
def handleSignUp():
    # Sign up Email
    content = request.json
    email = content['email']
    password = content['password']

    # Select the user from the database
    select_stmt = "SELECT count(*) FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    result = cursor.fetchone()

    if result[0] == 0:
        print("here")
        insert_stmt = "INSERT INTO User VALUES (%s, %s, %s)"
        print(password)
        data = (email, generate_password_hash(password), 15)
        cursor.execute(insert_stmt, data)
        cnxn.commit()
        return Response("create user success", status=200)
    else:
        return Response("user already exist", status=400)
