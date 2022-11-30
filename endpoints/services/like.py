from flask import Response
import mysql.connector
from endpoints.repositories.post_repo import likePost

def handle_like(post_url):
    if post_url == "":
        return Response("Missing input value", status=400)
    try:
        likePost(post_url)
        return Response("Add like success", status=200)
    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)
    