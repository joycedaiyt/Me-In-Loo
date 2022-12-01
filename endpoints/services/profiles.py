import os
import uuid
import json
import mysql.connector
from minio import Minio
from flask import Response
from sessionData import session
from endpoints.repositories.profile_repo import updateProfileDesciprtion, updateProfilePic, getProfile
from endpoints.repositories.user_repo import getUserPoints


def updateProfile(new_pic, new_description):
    # check which column needs to update
    if new_description == "" and not new_pic:
        return Response("Missing input value", status=400)
    
    print(new_description)
    
    user_email = session['user_email']
    
    try:
        if new_description != "":
            print(new_description)
            updateProfileDesciprtion(new_description, user_email)
        
        if new_pic:
            new_pic = new_pic['new_pic']

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

            fileName = "meme/"+str(uuid.uuid4())+"."+new_pic.filename.split('.')[1]
            size = os.fstat(new_pic.fileno()).st_size

            minioClient.put_object(
                bucket_name, fileName, new_pic, size
            )

            new_pic_url = "http://127.0.0.1:9000/"+bucket_name+"/"+fileName
            updateProfilePic(new_pic_url, user_email)

        return Response("Successfully update!", status=200)

    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)


def getProfileInfo():
    user_email = session['user_email']

    try:
        profile = getProfile(user_email)
        points = getUserPoints(user_email)
        
    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)
    
    profiledto= {
        'user_email': profile[0],
        'profile_pic_url': profile[1],
        'prof_description': profile[2],
        'post_count': profile[3],
        'points': points[0]
    }

    return Response(json.dumps(profiledto), status=200)
