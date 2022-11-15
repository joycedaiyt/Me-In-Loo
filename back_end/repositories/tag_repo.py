from back_end import cursor, cnxn


def getTagIdByCategory(category):
    # Fetch tag from database
    select_stmt = "SELECT tag_id FROM Tag WHERE category = %(category)s"
    cursor.execute(select_stmt, {'category': category})
    user = cursor.fetchone()

    return user


def createTag(category):
    insert_stmt = "INSERT INTO Tag VALUES (%s)"
    cursor.execute(insert_stmt, category)
    cnxn.commit()


def getAllTagIdsByCategories(categories):
    select_ids = "SELECT tag_id FROM Tag WHERE category IN {}".format(
        categories)
    cursor.execute(select_ids)
    tag_ids = cursor.fetchall()
    ids = ()
    for tag_id in tag_ids:
        ids += (tag_id,)

    return ids


def getMissingTagIdsFromPost(post_url, tag_ids):
    select_insertids = """SELECT tag_id FROM Tag 
                          WHERE tag_id NOT IN 
                            (SELECT tag_id FROM AttachedBy WHERE post_url = %(post_url)s) 
                          AND tag_id IN {}
                        """.format({'post_url': post_url}, tag_ids)
    cursor.execute(select_insertids)
    tag_ids = cursor.fetchall()
    ids = ()
    for tag_id in tag_ids:
        ids += (tag_id,)

    return ids


def attachTagsToPostByIds(post_url, tag_ids):
    for tag_id in tag_ids:
        attach_stmt = "INSERT INTO AttachedBy VALUES(%s, %s)"
        data = (post_url, tag_id)
        cursor.execute(attach_stmt, data)


def getAllTags():
    select_stmt = "SELECT category FROM Tag ORDER BY category DESC"
    cursor.execute(select_stmt)
    all_tags = cursor.fetchall()
    return all_tags
