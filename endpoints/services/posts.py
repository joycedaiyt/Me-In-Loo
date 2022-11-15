import os
import uuid
import datetime
from minio import Minio
from flask import Response
from sessionData import session
from mysql.connector import Error as err
from endpoints.repositories.user_repo import addUserPoint2
from endpoints.repositories.profile_repo import addPostCount
from endpoints.repositories.post_repo import getPostByUrl, insertPost

def uploadMeme(meme, cost, post_name, tags):
    # check if content has all required data
    if meme == None or cost == None or post_name == None or tags == None:
        return Response("Missing input value", status=400)

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

    fileName = "meme/"+str(uuid.uuid4())
    size = os.fstat(meme.fileno()).st_size

    minioClient.put_object(
        bucket_name, fileName, meme, size
    )

    post_url = "http://127.0.0.1:9000/"+bucket_name+"/"+fileName,

    try:
        email = session.get("email")
        print(email)
        content = {
            'cost': cost,
            'email': email,
            'post_url': post_url,
            'post_name': post_name,
            'update_date': datetime.datetime.Now()
        }
        insertPost(content)
        addPostCount(email)
        addUserPoint2(email)

        return Response("Meme successfully uploaded", status=200)
    except err:
        return Response("Something went wrong: {}".format(err), status=400)


