from back_end import cursor, cnxn


def createProfile(email):
    insert_stmt = "INSERT INTO Profile (user_email, post_count) VALUES (%s, %s)"
    data = (email, 0)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def updateProfilePic():
    raise NotImplemented


def updateProfileDesciprtion():
    raise NotImplemented


def addPostCount(email):
    update_stmt = "UPDATE Profile SET post_count = post_count + 1 WHERE user_email = %(email)s"
    cursor.execute(update_stmt, {'email': email})

