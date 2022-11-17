from flask import session
from endpoints import cursor, cnxn


def insertPost(content):
    cost = content['cost']
    user_email = session['email']
    post_url = content['post_url']
    post_name = content['post_name']
    update_date = content['update_date']

    # insert the new post into the database
    insert_stmt = "INSERT INTO Post VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    data = (user_email, post_url, post_name, update_date, 0, 0, cost, 0)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def getPostByUrl(post_url):
    # Fetch post from database
    select_stmt = "SELECT * FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    post = cursor.fetchone()

    return post

def getUserByUrl(post_url):
    # Fetch post from database
    select_stmt = "SELECT user_email FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    user_email = cursor.fetchone()

    return user_email

def getReportCount(post_url):
    # Fetch post from database
    select_stmt = "SELECT report_count FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    report_count = cursor.fetchone()

    return report_count

def deleteFromPost(post_url):
    delete_stmt = "DELETE FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(delete_stmt, {'post_url': post_url})

def addReportCount(post_url):
    update_stmt = "UPDATE Post SET report_count = report_count + 1 WHERE post_url = %(post_url)s"
    cursor.execute(update_stmt, {'post_url': post_url})
    
def checkReport(user_email, post_url):
    select_stmt = "SELECT user_email FROM Post WHERE user_email = %(user_email)s and post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    user_email = cursor.fetchone()

    return user_email is None