from flask import Response
from endpoints.repositories.user_repo import addUserPoint2, minusUserPoint
from endpoints.repositories.profile_repo import addPostCount
from endpoints.repositories.post_repo import getPostByUrl, insertPost, getUserByUrl, getReportCount, deleteFromPost
from endpoints.repositories.report_repo import deleteFromReport

def uploadMeme(content):
    # check if content has all required data
    if 'cost' and 'post_url' and 'post_name' and 'update_date' not in content:
        return Response("Missing input value", status=400)
    
    # check if the post_url already exists
    post = getPostByUrl(content['post_url'])

    if post:
        return Response("Meme has already been uploaded", status=400)
    else:
        email = content['email']
        insertPost(content)
        addPostCount(email)
        addUserPoint2(email)

def deleteMeme(content):
    # check if content has all required data
    if 'post_url' and 'report_count' not in content:
        return Response("Missing input value", status=400)

    # check if the user_email exists
    user_email = getUserByUrl(content['post_url'])

    # check if the report_count reaches delete requirement
    report_count = getReportCount(content['post_url'])

    if user_email:
        if report_count == 15:
            minusUserPoint(content['user_email'])
            # delete post from Report, AttachedBy, and Post, missing AttachedBy endpoint
            deleteFromReport(content['post_url'])
            deleteFromPost(content['post_url'])
    else:
        return Response("User email cannot found", status=400)
