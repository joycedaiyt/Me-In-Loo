import mysql.connector
from database.database_setup.gcp_sql_config import config


def getUserByEmail(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    # Fetch user from database
    select_stmt = "SELECT * FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    user = cursor.fetchone()
    cnxn.close()

    return user


def getUserCountByEmail(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    # Select the user from the database
    select_stmt = "SELECT count(*) FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    result = cursor.fetchone()
    cnxn.close()    

    return result


def createUser(email, secret):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    insert_stmt = "INSERT INTO User VALUES (%s, %s, %s)"
    data = (email, secret, 15)
    cursor.execute(insert_stmt, data)
    cnxn.commit()
    cnxn.close()


def addUserPoint2(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "UPDATE User SET points = points + 2 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})
    cnxn.commit()
    cnxn.close()


def minusUserPoint(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "UPDATE User SET points = points - 10 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})
    cnxn.commit()
    cnxn.close()


def getUserPoints(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    
    select_stmt = "SELECT points FROM User WHERE user_email = %(email)s"
    cursor.execute(select_stmt, {'email': email})
    points = cursor.fetchone()
    cnxn.close()

    return points
