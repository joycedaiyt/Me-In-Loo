import math
import mysql.connector
from database.database_setup.gcp_sql_config import config


def insertPost(content):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

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
    cnxn.close()


def getPostByUrl(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    # Fetch post from database
    select_stmt = "SELECT * FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    post = cursor.fetchone()

    cnxn.close()
    return post


def getPostsByPage(startat, per_page):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    select_stmt = "SELECT post_url, post_name, cost FROM Post ORDER BY update_date DESC LIMIT %s, %s;"
    data = (startat, per_page)
    cursor.execute(select_stmt, data)
    posts = cursor.fetchall()
    cnxn.close()

    return posts


def getPostCount(include_tag, per_page):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    select_stmt = "SELECT count(*) FROM Post"
    cursor.execute(select_stmt)
    count = cursor.fetchone()
    print(count)
    cnxn.close()

    return math.ceil(count[0] / int(per_page))


def getUserByUrl(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    # Fetch post from database
    select_stmt = "SELECT user_email FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    user_email = cursor.fetchone()
    cnxn.close()

    return user_email


def getReportCount(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    # Fetch post from database
    select_stmt = "SELECT report_count FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(select_stmt, {'post_url': post_url})
    report_count = cursor.fetchone()
    cnxn.close()

    return report_count


def deleteFromPost(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    delete_attach = "DELETE FROM AttachedBy WHERE post_url = %(post_url)s"
    delete_stmt = "DELETE FROM Post WHERE post_url = %(post_url)s"
    cursor.execute(delete_attach, {'post_url': post_url})
    cnxn.commit()
    cursor.execute(delete_stmt, {'post_url': post_url})
    cnxn.commit()
    cnxn.close()


def addReportCount(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    update_stmt = "UPDATE Post SET report_count = report_count + 1 WHERE post_url = %(post_url)s"
    cursor.execute(update_stmt, {'post_url': post_url})
    cnxn.commit()
    cnxn.close()


def checkReport(user_email, post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    select_stmt = "SELECT user_email FROM Report WHERE user_email = %(user_email)s and post_url = %(post_url)s"
    cursor.execute(
        select_stmt, {'user_email': user_email, 'post_url': post_url})
    user_email = cursor.fetchone()
    cnxn.close()

    return user_email is None
