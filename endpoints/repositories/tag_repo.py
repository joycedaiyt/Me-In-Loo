from endpoints import cursor, cnxn


def getTagIdByCategory(category):
    # Fetch tag from database
    select_stmt = "SELECT tag_id FROM Tag WHERE category = %(category)s"
    cursor.execute(select_stmt, {'category': category})
    user = cursor.fetchone()

    return user


def createTag(category):
    insert_stmt = "INSERT INTO Tag (category) VALUES (%(category)s)"
    cursor.execute(insert_stmt, {'category': category})
    cnxn.commit()


def getAllTags():
    select_stmt = "SELECT category FROM Tag ORDER BY category DESC"
    cursor.execute(select_stmt)
    all_tags = cursor.fetchall()

    return all_tags
