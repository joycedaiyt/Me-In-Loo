from flask import Response
from endpoints.repositories.post_repo import likedPost


def handle_like(content):
    # requires content to contain a post_url
    if 'post_url' not in content:
        return Response("Missing input value", status=400)

    likedPost(content['post_url'])
