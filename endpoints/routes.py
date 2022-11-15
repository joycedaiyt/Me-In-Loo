from flask import request, Blueprint
from back_end.services import login_signup, posts, tags


# In Flask, a blueprint is just a group of related routes (the functions below), it helps organize your code
routes = Blueprint('api', __name__)

@routes.route('/users', methods=['GET'])
def userLogin():
    # Retrieve user entered login info
    content = request.json
    email = content['email']
    password = content['password']

    return login_signup.handleLogin(email, password)


@routes.route('/users', methods=['POST'])
def userSignUp():
    # Retrieve user entered sign-up info
    content = request.json
    email = content['email']
    password = content['password']

    return login_signup.handleSignUp(email, password)


@routes.route('/posts', methods=['POSTS'])
def getMeme():
    
    # upload a post to 
    # need a post name
    # cost
    # post url,,
    pass


@routes.route('/posts', methods=['POSTS'])
def createPost():
    # Retrieve user entered upload post info
    content = request.json

    return posts.uploadMeme(content)


@routes.route('/tags', methods=['POSTS'])
def addTagsToPost():
    # Retrieve user entered upload post info
    content = request.json

    return tags.addTagsToPost(content)
