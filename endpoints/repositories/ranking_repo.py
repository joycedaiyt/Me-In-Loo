import mysql.connector
from database.database_setup.gcp_sql_config import config


def getRankingMemesLike():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    select_stmt = "Select post_name, post_url, like_count from Post order by like_count Desc Limit 5"
    cursor.execute(select_stmt)
    ranking = cursor.fetchall()
    return ranking


def getRankingMemesDownload():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    select_stmt = "Select post_name, post_url, download_count from Post order by download_count Desc Limit 5"
    cursor.execute(select_stmt)
    ranking = cursor.fetchall()
    return ranking


def getRankingUserCount():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    select_stmt = "Select user_email, profile_pic_url, prof_description, post_count from Profile order by post_count Desc LIMIT 5"
    cursor.execute(select_stmt)
    ranking = cursor.fetchall()
    return ranking


def getRankingUserPoints():
    cnxn = mysql.connector.connect(**config)
    cursor = cnxn.cursor()
    select_stmt = "Select User.user_email, profile_pic_url, prof_description, points from User, Profile where User.user_email = Profile.user_email order by points Desc LIMIT 5"
    cursor.execute(select_stmt)
    ranking = cursor.fetchall()
    return ranking
