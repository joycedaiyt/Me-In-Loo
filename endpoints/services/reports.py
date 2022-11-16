from flask import Response
from endpoints.repositories.report_repo import createReport
from endpoints.repositories.post_repo import getPostByUrl, addReportCount

def reportMeme(content):
    # check if content has post url
    if 'post_url' and 'create_date' and 'rep_description' not in content:
        return Response("Missing input value", status=400)

    # check if the post_url already exists
    post = getPostByUrl(content['post_url'])

    if post:
        post = content['post_url']
        createReport(content)
        addReportCount(post)
        return Response("report success", status=200)
    else:
        return Response("Meme does not exist so we cannot report", status=400)
