from flask import session
from back_end import cursor, cnxn


def insertPost(content):
    cost = content['cost']
    user_email = session['email']
    post_url = content['post_url']
    post_name = content['post_name']
    update_date = content['update_date']

    # insert the new post into the database
    insert_stmt = "INSERT INTO Post VALUES (%s, %s, %s)"
    data = (user_email, post_url, post_name, update_date, 0, 0, cost, 0)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def getPostByUrl(post_url):
    # Fetch post from database
    select_stmt = "SELECT * FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    post = cursor.fetchone()

    return post
    