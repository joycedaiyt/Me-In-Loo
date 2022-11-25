import mysql.connector
from database.database_setup.gcp_sql_config import config


def createReport(user_email, post_url, create_date, rep_description):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    insert_stmt = "INSERT INTO Report VALUES (%s, %s, %s, %s)"
    data = (user_email, post_url, rep_description, create_date)
    cursor.execute(insert_stmt, data)
    cnxn.commit()


def deleteFromReport(post_url):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    delete_stmt = "DELETE FROM Report WHERE post_url = %(post_url)s"
    cursor.execute(delete_stmt, {'post_url': post_url})
    cnxn.commit()


def checkReport(user_email, post_url):

    return True
