from flask import request, Blueprint
from endpoints.services import login_signup, posts, tags


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
def getMeme():
    
    # upload a post to 
    # need a post name
    # cost
    # post url,,
    pass


@routes.route('/posts', methods=['POST'])
def createPost():
    # Retrieve user entered upload post info
    meme = request.files["meme"]
    cost = int(request.form.get('cost'))
    post_name = request.form.get('post_name')
    tags = request.form.get('tags')

    return posts.uploadMeme(meme, cost, post_name, tags)


@routes.route('/tags', methods=['POST'])
def addTagsToPost():
    # Retrieve user entered upload post info
    content = request.args

    return tags.addTagsToPost(content)
