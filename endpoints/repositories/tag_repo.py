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


def getTagIdsByCategories(tags):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    categories = tags.split(",")
    # print(categories)

    data = tuple(categories)
    select_tagids = """SELECT DISTINCT tag_id FROM Tag 
                          WHERE category IN ({categories_placeholders})
                        """.format(categories_placeholders=",".join(["%s"] * len(categories)),)

    cursor.execute(select_tagids, data)
    tag_ids = cursor.fetchall()
    ids = []
    for tag_id in tag_ids:
        ids.append(tag_id[0])

    cnxn.close()
    
    return ids
