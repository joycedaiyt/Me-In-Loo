from flask import Response
from sessionData import session
from endpoints.repositories.report_repo import createReport, deleteFromReport
from endpoints.repositories.user_repo import minusUserPoint
from endpoints.repositories.post_repo import getPostByUrl, addReportCount, checkReport, getReportCount, deleteFromPost


def reportMeme(content):
    print(session.get("user_email"))
    # check if content has post url
    if 'post_url' and 'create_date' and 'rep_description' not in content:
        return Response("Missing input value", status=400)

    # check if the post_url already exists
    post = getPostByUrl(content['post_url'])

    if post and checkReport(session['user_email'], content['post_url']):
        post = content['post_url']
        createReport(content)
        addReportCount(post)
        report_count = getReportCount(content['post_url'])[0]
        user_email = session["user_email"]
        if user_email:
            if report_count == 15:
                minusUserPoint(user_email)
                # delete post from Report, AttachedBy, and Post, missing AttachedBy endpoint
                deleteFromReport(content['post_url'])
                deleteFromPost(content['post_url'])

        return Response("report success", status=200)
    else:
        return Response("Meme does not exist so we cannot report", status=400)
