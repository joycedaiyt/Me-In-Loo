from flask import Response
from endpoints.repositories.user_repo import addUserPoint2
from endpoints.repositories.profile_repo import addPostCount
from endpoints.repositories.post_repo import getPostByUrl, insertPost

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

