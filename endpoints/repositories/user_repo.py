from endpoints import cursor, cnxn


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


def createUser(email, secret):
    insert_stmt = "INSERT INTO User VALUES (%s, %s, %s)"
    data = (email, secret, 15)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def addUserPoint2(email):
    update_stmt = "UPDATE User SET points = points + 2 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})

def minusUserPoint(email):
    update_stmt = "UPDATE User SET points = points - 10 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})
