from endpoints.repositories.tag_repo import (createTag, getTagIdByCategory, getAllTags)
from endpoints.repositories.attachedBy_repo import getMissingTagIdsFromPost, attachTagsToPostByIds


def addTagsToPost(post_url, tags):
    categories = tags.split(",")

    tag_ids = []
    for category in categories:
        tag_id = getTagIdByCategory(category)[0]
        if (tag_id == None):
            createTag(category)
            tag_id = getTagIdByCategory(category)[0]
        tag_ids.append(tag_id)

    missing_tag_ids = getMissingTagIdsFromPost(post_url, tag_ids)
    attachTagsToPostByIds(post_url, missing_tag_ids)


def getTagsAll():
    tags_list = getAllTags()
    tags = []
    for tag in tags_list:
        tags.append(tag[0])
    return tags
