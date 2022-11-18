import datetime
from flask import request, Blueprint
from endpoints.services import login_signup, posts, tags, reports


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

    return posts.getPostsOnPage(int(page), int(per_page), False)


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
