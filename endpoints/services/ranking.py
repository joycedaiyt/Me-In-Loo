import os
import uuid
import json
import mysql.connector
from flask import Response
from endpoints.repositories.ranking_repo import (
    getRankingMemesLike, getRankingUserCount, getRankingMemesDownload, getRankingUserPoints)


def getInfoForRanking():
    try:
        memeLikes = getRankingMemesLike()
        memeDownload = getRankingMemesDownload()
        userCount = getRankingUserCount()
        userPoints = getRankingUserPoints()

    except mysql.connector.Error as err:
        return Response("Something went wrong: {}".format(err.msg), status=400)

    memeLikeArr = []
    memeDownloadArr = []
    userCountArr = []
    userPointsArr = []

    for item in memeLikes:
        content = {
            "src": item[1],
            "likeCount": item[2],
            "name": item[0]
        }
        memeLikeArr.append(content)

    for item in memeDownload:
        content = {
            "src": item[1],
            "downloadCount": item[2],
            "name": item[0]
        }
        memeDownloadArr.append(content)

    for item in userCount:
        content = {
            "src": item[1],
            "memesCount": item[3],
            "description": item[2],
            "name": item[0]
        }
        userCountArr.append(content)

    for item in userPoints:
        content = {
            "src": item[1],
            "pointsCount": item[3],
            "description": item[2],
            "name": item[0]
        }
        userPointsArr.append(content)

    return Response(json.dumps([memeLikeArr, memeDownloadArr, userCountArr, userPointsArr]), status=200)
