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
    
    # check if the post_url al
    post_url = content['post_url']
    print(content)
    post = getPostByUrl(post_url)
    print(post)

    if post and checkReport(session['user_email'], content['post_url']):
        print("1111111111")
        user_email = session['user_email']
        create_date = content['create_date']
        rep_description = content['rep_description']

        createReport(user_email, post_url, create_date, rep_description)
        addReportCount(post_url)
        
        report_count = getReportCount(post_url)[0]
        if user_email and report_count == 15:
            minusUserPoint(user_email)
            # delete post from Report, AttachedBy, and Post, missing AttachedBy endpoint
            # deleteFromReport(content['post_url']) included in triggers
            deleteFromPost(post_url)
        
        print("here")
        return Response("report success", status=200)
    else:
        return Response("You have reported on this meme already", status=400)
