import mysql.connector
from database.database_setup.gcp_sql_config import config


def getTagIdByCategory(category):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    # Fetch tag from database
    select_stmt = "SELECT tag_id FROM Tag WHERE category = %(category)s"
    cursor.execute(select_stmt, {'category': category})
    user = cursor.fetchone()
    cnxn.close()

    return user


def createTag(category):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    insert_stmt = "INSERT INTO Tag (category) VALUES (%(category)s)"
    cursor.execute(insert_stmt, {'category': category})
    cnxn.commit()
    cnxn.close()


def getAllTags():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    
    select_stmt = "SELECT category FROM Tag ORDER BY category DESC"
    cursor.execute(select_stmt)
    all_tags = cursor.fetchall()
    cnxn.close()

    return all_tags
