import mysql.connector
from database.database_setup.gcp_sql_config import config


def getMissingTagIdsFromPost(post_url, tag_ids):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    data = tuple([post_url] + tag_ids)
    print(data)
    select_insertids = """SELECT tag_id FROM Tag 
                          WHERE tag_id NOT IN 
                            (SELECT tag_id FROM AttachedBy WHERE post_url = %s) 
                          AND tag_id IN ({ids_placeholders})
                        """.format(ids_placeholders=",".join(["%s"] * len(tag_ids)),)

    cursor.execute(select_insertids, data)
    tag_ids = cursor.fetchall()
    print(tag_ids)
    ids = []
    for tag_id in tag_ids:
        ids.append(tag_id[0])

    cnxn.close()
    
    return ids

def attachTagsToPostByIds(post_url, tag_ids):
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()

    for tag_id in tag_ids:
        attach_stmt = "INSERT INTO AttachedBy VALUES(%s, %s)"
        data = (post_url, tag_id)
        cursor.execute(attach_stmt, data)
        cnxn.commit()
    
    cnxn.close()
    