from flask import Response
from sessionData import session
from endpoints.repositories.report_repo import createReport, deleteFromReport
from endpoints.repositories.user_repo import reduceUserPoint
from endpoints.repositories.post_repo import getPostByUrl, addReportCount, checkReport, getReportCount, deleteFromPost


def reportMeme(content):
    # check if content has post url
    if 'post_url' and 'create_date' and 'rep_description' not in content:
        return Response("Missing input value", status=400)
    
    # check if the post_url al
    post_url = content['post_url']
    hasReported = checkReport(session['user_email'], content['post_url'])

    if hasReported:
        user_email = session['user_email']
        create_date = content['create_date']
        rep_description = content['rep_description']

        createReport(user_email, post_url, create_date, rep_description)
        addReportCount(post_url)
        
        report_count = getReportCount(post_url)[0]
        if user_email and report_count == 15:
            reduceUserPoint(user_email, 10)
            # delete post from Report, AttachedBy, and Post, missing AttachedBy endpoint
            # deleteFromReport(content['post_url']) included in triggers
            deleteFromPost(post_url)
        
        return Response("report success", status=200)
    else:
        return Response("You have reported on this meme already", status=400)
