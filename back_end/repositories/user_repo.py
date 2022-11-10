from back_end import cursor
from werkzeug.security import check_password_hash, generate_password_hash


def getUserByEmail(email):
    # Fetch user from database
    select_stmt = "SELECT * FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    user = cursor.fetchone()

    return user


def getUserCountByEmail(email):
    # Select the user from the database
    select_stmt = "SELECT count(*) FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    result = cursor.fetchone()

    return result
