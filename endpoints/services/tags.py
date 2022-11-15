from flask import Response
from endpoints.repositories.tag_repo import (createTag, getAllTagIdsByCategories,
                                             getMissingTagIdsFromPost, getTagIdByCategory,
                                             attachTagsToPostByIds, getAllTags)


def addTagsToPost(content):
    post_url = content['post_url']
    categories = content['tags'].split(",")

    for category in categories:
        tag_id = getTagIdByCategory(category)
        if (tag_id == None):
            createTag(category)

    tag_ids = getAllTagIdsByCategories(tuple(categories))
    missing_tag_ids = getMissingTagIdsFromPost(post_url, tag_ids)
    attachTagsToPostByIds(post_url, missing_tag_ids)


def getTagsAll():
    tags_list = getAllTags()
    tags = []
    for tag in tags_list:
        tags.append(tag[0])
    return tags
