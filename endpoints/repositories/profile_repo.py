import mysql.connector
from database.database_setup.gcp_sql_config import config


def createProfile(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    insert_stmt = "INSERT INTO Profile (user_email, post_count) VALUES (%s, %s)"
    data = (email, 0)
    cursor.execute(insert_stmt, data)
    cnxn.commit()
    cnxn.close()


def updateProfileDesciprtion(new_description, user_email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "Update Profile set prof_description = %s where user_email = %s"
    data = (new_description, user_email)
    cursor.execute(update_stmt, data)
    cnxn.commit()
    cnxn.close()


def updateProfilePic(new_pic_url, user_email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "Update Profile set profile_pic_url = %s where user_email = %s"
    data = (new_pic_url, user_email)
    cursor.execute(update_stmt, data)
    cnxn.commit()
    cnxn.close()


def addPostCount(email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "UPDATE Profile SET post_count = post_count + 1 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})
    cnxn.commit()
    cnxn.close()


def getProfile(user_email):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    select_stmt = "Select * from Profile where user_email = %(user_email)s"
    cursor.execute(select_stmt, {'user_email': user_email})
    profile = cursor.fetchone()
    cnxn.close()
    
    return profile
