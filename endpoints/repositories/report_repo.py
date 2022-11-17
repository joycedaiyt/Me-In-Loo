from sessionData import session
from endpoints import cursor, cnxn


def createReport(content):
    user_email = session['user_email']
    post_url = content['post_url']
    create_date = content['create_date']
    rep_description = content['rep_description']
    insert_stmt = "INSERT INTO Report VALUES (%s, %s, %s, %s)"
    data = (user_email, post_url, rep_description, create_date)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def deleteFromReport(post_url):
    delete_stmt = "DELETE FROM Report WHERE post_url = %(post_url)s"
    cursor.execute(delete_stmt, {'post_url': post_url})
    cnxn.commit()


def checkReport(user_email, post_url):

    return True
