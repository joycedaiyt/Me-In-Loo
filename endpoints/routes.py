import datetime
from flask import request, Blueprint
from endpoints.services import login_signup, posts, tags, reports, profiles, ranking, like


# In Flask, a blueprint is just a group of related routes (the functions below), it helps organize your code
routes = Blueprint('api', __name__)


@routes.route('/users', methods=['GET'])
def userLogin():
    # Retrieve user entered login info
    email = request.args.get('email')
    password = request.args.get('password')

    return login_signup.handleLogin(email, password)


@routes.route('/users', methods=['POST'])
def userSignUp():
    # Retrieve user entered sign-up info
    email = request.args.get('email')
    password = request.args.get('password')

    return login_signup.handleSignUp(email, password)


@routes.route('/posts', methods=['GET'])
def displayPosts():
    page = request.args.get('page')
    per_page = request.args.get('per_page')
    include_tag = request.args.get('include_tag')
    return posts.getPostsOnPage(int(page), int(per_page), include_tag)


@routes.route('/posts', methods=['POST'])
def createPost():
    # Retrieve user entered upload post info
    meme = request.files
    cost = int(request.form.get('cost'))
    post_name = request.form.get('post_name')
    tags = request.form.get('tags')

    return posts.uploadMeme(meme, cost, post_name, tags)


@routes.route('/tags', methods=['POST'])
def addTags():
    # Retrieve user entered upload post info
    content = request.get_json()
    post_url = content['post_url']
    taglist = content['tags']

    return tags.addTagsToPost(post_url, taglist)


@routes.route("/tags", methods=['GET'])
def getAllTags():
    return tags.getTagsAll()


@routes.route("/reports", methods=["POST"])
def createReport():
    content = request.get_json()
    content['create_date'] = datetime.datetime.utcnow()

    return reports.reportMeme(content)


@routes.route("/account", methods=['GET'])
def getAccountInfo():
    return profiles.getProfileInfo()


@routes.route("/account/update", methods=['PUT'])
def updateAccountInfo():
    new_pic = request.files
    new_description = request.form.get('new_description')

    return profiles.updateProfile(new_pic, new_description)


@routes.route("/download", methods=['GET'])
def downloadMeme():
    post_url = request.args.get('post_url')
    # print(content)

    # post_url = content['post_url']

    return posts.downloadMeme(post_url)


@routes.route("/ranking", methods=['GET'])
def rankingInfo():
    return ranking.getInfoForRanking()


@routes.route('/like', methods=['POST'])
def likePost():
    #content = request.get_json()
    post_url = request.args.get('post_url')
    return like.handle_like(post_url)


@routes.route("/popular", methods=['GET'])
def getPopularPost():
    return posts.getMostPopularPost()
