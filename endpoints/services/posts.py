import os
import uuid
import json
import datetime
import mysql.connector
from minio import Minio
from flask import Response
from sessionData import session
from endpoints.services.tags import addTagsToPost
from endpoints.repositories.post_repo import insertPost, getPostsByPage, getPostCount, getUserByUrl, getReportCount, deleteFromPost
from endpoints.repositories.user_repo import addUserPoint2, minusUserPoint
from endpoints.repositories.profile_repo import addPostCount
from endpoints.repositories.report_repo import deleteFromReport


def uploadMeme(meme, cost, post_name, tags):
    # check if content has all required data
    print(cost)
    if not meme or cost == "" or post_name == "" or tags == None:
        return Response("Missing input value", status=400)

    meme = meme['meme']

    # setup MinIO connection
    minioClient = Minio(
        endpoint="localhost:9000",
        secure=False,
        access_key="minioadmin",
        secret_key='minioadmin'
    )

    bucket_name = "me-in-loo"
    found = minioClient.bucket_exists(bucket_name)

    if not found:
        minioClient.make_bucket(bucket_name)

    fileName = "meme/"+str(uuid.uuid4())+"."+meme.filename.split('.')[1]
    size = os.fstat(meme.fileno()).st_size

    minioClient.put_object(
        bucket_name, fileName, meme, size
    )

    post_url = "http://127.0.0.1:9000/"+bucket_name+"/"+fileName

    try:
        email = session.get("user_email")
        print(email)
        content = {
            'user_email': email,
            'cost': cost,
            'email': email,
            'post_url': post_url,
            'post_name': post_name,
            'update_date': str(datetime.datetime.utcnow())
        }

        insertPost(content)
        addPostCount(email)
        addUserPoint2(email)
        addTagsToPost(post_url, tags)

        return Response("Meme successfully uploaded", status=200)

    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)


def getPostsOnPage(page, per_page, include_tag):
    try:
        startat = page * per_page
        print(startat)
        posts = getPostsByPage(startat, per_page)
        count = getPostCount(include_tag, per_page)

    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)

    postsDto = []
    for post in posts:
        postdata = {
            'src': post[0],
            'memeName': post[1],
            'cost': post[2]
        }
        postsDto.append(postdata)
        # retval = {
        #     'count': count,
        #     'memes': postsDto
        # }

    return Response(json.dumps([count, postsDto]), status=200)


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
