from endpoints import cursor, cnxn
import math


def insertPost(content):
    cost = content['cost']
    user_email = content['user_email']
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


def getPostsByPage(startat, per_page):
    select_stmt = "SELECT post_url, post_name, cost FROM Post ORDER BY update_date DESC LIMIT %s, %s;"
    data = (startat, per_page)
    cursor.execute(select_stmt, data)
    posts = cursor.fetchall()

    return posts


def getPostCount(include_tag, per_page):
    select_stmt = "SELECT count(*) FROM Post"
    cursor.execute(select_stmt)
    count = cursor.fetchone()
    print(count)
    return math.ceil(count[0] / int(per_page))
