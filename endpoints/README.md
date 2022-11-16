## Endpoints
Each endpoint is a feature and is contained in `routes.py`. We used the controller-service-repository pattern, so each related endpoint \
uses functions from their designated service and repository. Below are the features implemented:

### LogIn
```
http://localhost:3000/?page=login
```
- Authenticates user login and creates a session with the login information. 
- Detailed implementation is located in `routes.py`, `./services/login_signup.py`, and `./repositories/user_repo.py`.

### SignUp
```
http://localhost:3000/signUp
```
- Creates a new user and their profile. 
- Detailed implementation is located in `routes.py`, `./services/login_signup.py`, and `./repositories/user_repo.py`, and `./repositories/profile_repo.py`

### Display Posts by Page
```
http://localhost:3000/memes
```
- Displays all the posts on a given page
- Detailed implementation is located in `routes.py`, `./services/posts.py`, and `./repositories/user_repo.py`, and `./repositories/profile_repo.py`

### Upload Meme
```
http://localhost:3000/upload
```
- Creates a new post with the uploaded meme
- Detailed implementation is located in `routes.py`, `./services/posts.py`,  `./repositories/user_repo.py`, and `./repositories/post_repo.py`

### Add Tag to Post
- Adds the given tags to a post and creates the tags if they do not already exist in the database
- Detailed implementation is located in `./services/tags.py`, `./repositories/tag_repo.py`, and `./repositories/attachedBy_repo.py`
