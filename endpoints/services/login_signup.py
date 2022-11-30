from flask import Response
from sessionData import session
from werkzeug.security import check_password_hash, generate_password_hash
from endpoints.repositories.user_repo import getUserByEmail, getUserCountByEmail, createUser
from endpoints.repositories.profile_repo import createProfile
from mysql.connector import Error as err


def handleLogin(email, password):
    # Fetch user from database
    user = getUserByEmail(email)

    # If User exists
    if user:
        # Get existing user password
        hashed_password = user[1]

        if check_password_hash(hashed_password, password):
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['user_email'] = user[0]
            return Response("Successful Login!", status=200, mimetype='application/json')
        else:
            return Response("Incorrect password", status=400)
    else:
        return Response("Incorrect username", status=400)


def handleSignUp(email, password):
    # Select the user from the database
    result = getUserCountByEmail(email)
    if result[0] == 0:
        createUser(email, generate_password_hash(password))
        createProfile(email)
        return Response("create user success", status=200)
    else:
        return Response("user already exist", status=400)
