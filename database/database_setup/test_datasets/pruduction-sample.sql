-- sign up and sign in

-- success signup
SELECT count(*) FROM User WHERE user_email = 'KarlJohnson1000@gmail.com';

-- initial points is 15 for new user
INSERT INTO User 
VALUES ('KarlJohnson1000@gmail.com', 'pbkdf2:sha256:260000$TA9mSuP8Mgnm8hsw$eaa4c71d10dc136b3d51c1cb96dc90ee4d7c91fa5e301b30d40a4c6621d06ece', 28);
INSERT INTO Profile VALUES ('KarlJohnson1000@gmail.com', NULL, 'Care recognize production nor for as full.', 0);

-- fail signup due to duplicate
SELECT count(*) FROM User WHERE user_email = 'KarlJohnson1000@gmail.com';

-- fail signup due to frontend did not pass enough data:
INSERT INTO User(user_email, user_secret) VALUES ('KarlJohnson1000@gmail.com", "pbkdf2:sha256:260000$VU66EONBpZ1Nj1Uy$9636be746e5ee6334919b3ce2a567bb146b71c37d5191412706425506838ae28'); -- fail

-- successful signin or not
SELECT user_secret FROM User WHERE user_email = 'KarlJohnson1000@gmail.com';

-- if the result query is empty, raise incorrect user name error, if not check secret
-- check user secret to see if it equals to the secret which passed in as frontend, if so allow user to login, otherwise raise incorrect password error


-- Upload Post:

-- upload picture failure:
INSERT INTO Post (user_email, post_url, update_date, cost) 
VALUES('KarlJohnson1000@gmail.com', 'http://localhost:9000/me-in-loo/meme/02574f2d-5e85-4348-bfcb-07971f695732.jpg','2022-06-17 17:38:09', 5); -- fail if user does not provide name or frontend does not pass enough data
SELECT count(*) FROM Post;

-- upload 1 picture successfull:
INSERT INTO Post 
VALUES('ChristinaTakaki156@gmail.com', 'http://localhost:9000/me-in-loo/posts/999.jpg', 'tacky', '2020-08-22 04:44:10', 943, 109, 8, 0);

SELECT * FROM Post WHERE post_url = "http://localhost:9000/me-in-loo/posts/999.jpg";

SELECT count(*) FROM Post WHERE user_email = "ChristinaTakaki156@gmail.com";

UPDATE User SET points = points + 2 
            WHERE user_email = 'ChristinaTakaki156@gmail.com';

SELECT points FROM User WHERE user_email = "ChristinaTakaki156@gmail.com";

UPDATE Profile SET post_count = post_count + 1 
               WHERE user_email = 'ChristinaTakaki156@gmail.com';
SELECT post_count FROM Profile WHERE user_email = "ChristinaTakaki156@gmail.com";


-- Display Post:
-- Get posts given a page and per_page count
SELECT post_url, post_name, cost FROM Post ORDER BY update_date DESC LIMIT 5, 5;


-- tag:
-- for each tag use in frontend, it will call endpoints to run following queries:
SELECT count(*) FROM Tag WHERE category='python';

-- if = 0, then new tag:
INSERT INTO Tag (category) VALUES('python');
SELECT count(*) FROM Tag WHERE category = 'python';

-- otherwise do nothing

-- Suppose the tags selected are gentle, able, and flashy
SELECT tag_id FROM Tag 
WHERE category = 'able' OR category = 'gentle' OR category = 'flashy';

-- get all missing ids from the post
SELECT tag_id FROM Tag WHERE tag_id NOT IN 
     (SELECT tag_id FROM AttachedBy WHERE post_url 'http://localhost:9000/me-in-loo/posts/1055') 
AND tag_id IN (364, 86, 589)

-- insert tags which are newly added to the post(6, 7, 8) in this case
INSERT INTO AttachedBy(post_url, tag_id) 
VALUES('http://localhost:9000/me-in-loo/posts/1055', 86), ('http://localhost:9000/me-in-loo/posts/1055', 589);

Select category from Tag where tag_id in (Select tag_id from AttachedBy where post_url = 'http://localhost:9000/me-in-loo/posts/1055');


-- Report:
-- Report submit failure due to same user report same post multiple times, and will only has one query
SELECT count(*) FROM Report 
WHERE user_email = 'WilliamIgtanloc378@gmail.com' and post_url='http://localhost:9000/me-in-loo/posts/1025.jpg'; -- fail

-- Report submit success, but the report count does not met delete requirement:
INSERT INTO Report (user_email, post_url, create_date) 
VALUES('WillieLiriano692@gmail.com', 'http://localhost:9000/me-in-loo/posts/998.jpg', '2022-10-15 05:15:31');

SELECT * FROM Report WHERE user_email = 'WillieLiriano692@gmail.com' and post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';

UPDATE Post SET report_count = report_count + 1 
     WHERE post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';

SELECT report_count FROM Post WHERE post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';

-- Report submit success, and the report count reach to be deleted:
INSERT INTO Report (user_email, post_url, create_date) VALUES('MorrisMayhew690@gmail.com', 'http://localhost:9000/me-in-loo/posts/998.jpg', "2022-10-16 05:46:27");
SELECT * FROM Report LIMIT 10;
UPDATE Post SET report_count = report_count + 1 
     WHERE post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';
SELECT report_count FROM Post WHERE post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';

-- find the owner to post, and store that user_email in backend
SELECT user_email FROM Post WHERE post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg';
SELECT points FROM User WHERE user_email = 'ChristinaTakaki156@gmail.com';

DELETE FROM Post WHERE post_url = "http://localhost:9000/me-in-loo/posts/998.jpg";
SELECT count(*) FROM Report, AttachedBy, Post WHERE Post.post_url = 'http://localhost:9000/me-in-loo/posts/998.jpg' and Post.post_url = Report.post_url and Post.post_url = AttachedBy.post_url;


-- ranking information for rank page
-- select user with top 3 most points
Select user_email, profile_pic_url, prof_description from User, Profile where User.user_email = Profile.user_email order by points Desc LIMIT 3;

-- select user with top 3 most uploaded pictures
Select user_email, profile_pic_url, prof_description from Profile order by post_count Desc LIMIT 3;

-- select pictures wuth 3 most like
Select post_name, post_url from Post order by like_count Desc Limit 3;

-- select pictures with 3 most download
Select post_name, post_url from Post order by download_count Desc Limit 3;


-- Queries need for setting account info page

-- Given that the current user is KarenWestmark138@gmail.com
Select points, User.user_email, profile_pic_url, prof_description, post_count from User, Profile where User.user_email ="KarenWestmark138@gmail.com" and User.user_email = Profile.user_email;

-- Show the most popular(like most) post from that user
Select post_url, post_name from Post where user_email = "KarenWestmark138@gmail.com" order by like_count, download_count Desc Limit 1;

-- Users are able to update their personal information if needed
Update Profile set prof_description = "Perhaps data tend name effect lot give." where user_email = "KarenWestmark138@gmail.com";

-- To check the update command
Select * from Profile where user_email = "KarenWestmark138@gmail.com";

-- Users are able to change their profile picture
Update Profile set profile_pic_url = "http://localhost:9000/me-in-loo/profile_pics/174.jpg" where user_email = "KarenWestmark138@gmail.com";

-- To check the update command
Select * from Profile where user_mail = "KarenWestmark138@gmail.com";
