from flask import Response
from endpoints.repositories.tag_repo import (createTag, getAllTagIdsByCategories, 
                                            getMissingTagIdsFromPost, getTagIdByCategory, 
                                            attachTagsToPostByIds)
                                            

def addTagsToPost(content):
    post_url = content['post_url']
    categories = content['tags'].split(",")

    for category in categories:
        tag_id = getTagByCategory(category)
        if (tag_id == None):
            createTag(category)
    
    tag_ids = getAllTagIdsByCategories(tuple(categories))
    missing_tag_ids = getMissingTagIdsFromPost(post_url, tag_ids)
    attachTagsToPostByIds(post_url, missing_tag_ids)

