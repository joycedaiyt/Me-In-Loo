-- sign up and sign in

-- success signup
SELECT count(*) FROM User WHERE user_email = 'yiransun@gmail.com';

-- initial points is 15 for new user
INSERT INTO User 
VALUES ('yiransun@gmail.com', 'D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082', 15);
INSERT INTO Profile (user_email, post_count) VALUES ('yiransun@gmail.com', 0);

-- fail signup due to duplicate
SELECT count(*) FROM User WHERE user_email = 'yiransun@gmail.com';

-- fail signup due to frontend did not pass enough data:
INSERT INTO User(user_email, user_secret) VALUES ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082"); -- fail

-- successful signin or not
SELECT user_secret FROM User WHERE user_email = 'yiransun@gmail.com';

-- if the result query is empty, raise incorrect user name error, if not check secret
-- check user secret to see if it equals to the secret which passed in as frontend, if so allow user to login, otherwise raise incorrect password error

-- Post:
-- upload picture failure:
-- upload picture failure:
INSERT INTO Post (user_email, post_url, update_date, cost) 
VALUES('example2@gmail.com', 'thefat1010.com','1000-01-01 00:00:00', 5); -- fail if user does not provide name or frontend does not pass enough data
INSERT INTO Post (user_email, post_url, post_name, update_date, cost, report_count) 
VALUES('example2@gmail.com', 'thefat1.com', 'failDueToNotUniqueUrl', '1000-01-01 00:00:00', 5, 0); -- fail due to replicate url
SELECT count(*) FROM Post;

-- upload 1 picture successfull:
INSERT INTO Post (user_email, post_url, post_name, update_date, cost, report_count)
VALUES('example2@gmail.com', 'newpic1.com', 'success_single', '1000-01-01 00:00:00', 5, 0);

SELECT * FROM Post WHERE post_url = "newpic1.com";

SELECT count(*) FROM Post WHERE user_email = "example2@gmail.com";

UPDATE User SET points = points + 2 
            WHERE user_email = 'example2@gmail.com';

SELECT points FROM User WHERE user_email = "example2@gmail.com";

UPDATE Profile SET post_count = post_count + 1 
               WHERE user_email = 'example2@gmail.com';
SELECT post_count FROM Profile WHERE user_email = "example2@gmail.com";

-- Report:
-- Report submit failure due to same user report same post multiple times, and will only has one query
SELECT count(*) FROM Report 
WHERE user_email = 'example2@gmail.com' and post_url="abcd.com"; -- fail
-- INSERT INTO Report (user_email, post_url, create_date) 
-- VALUES('example3@gmail.com', 'zvideo.com', ‘1000-01-01 00:00:00’);
-- SELECT count(*) FROM Report 
-- WHERE user_email = 'example3@outlook.com' and post_url="xyzahah.com";

-- Report submit success, but the report count does not met delete requirement:
INSERT INTO Report (user_email, post_url, create_date) 
VALUES('example4@qq.com', 'thefat2.com', "1000-01-01 00:00:00");

SELECT * FROM Report WHERE user_email = 'example4@qq.com' and post_url = 'thefat2.com';

UPDATE Post SET report_count = report_count + 1 
     WHERE post_url = 'thefat2.com';

SELECT report_count FROM Post WHERE post_url = 'thefat2.com';

-- Report submit success, and the report count reach to be deleted:
INSERT INTO Report (user_email, post_url, create_date) VALUES('example3@outlook.com', 'thefat1.com', "1000-01-01 00:00:00");
SELECT * FROM Report;
UPDATE Post SET report_count = report_count + 1 
     WHERE post_url = 'thefat1.com';
SELECT report_count FROM Post WHERE post_url = 'thefat1.com';
-- find the owner to post, and store that user_email in backend
SELECT user_email FROM Post WHERE post_url = 'thefat1.com';
SELECT points FROM User WHERE user_email = 'example2@gmail.com';

DELETE FROM Post WHERE post_url = "thefat1.com";
SELECT count(*) FROM Report, AttachedBy, Post WHERE Post.post_url = 'thefat1.com' and Post.post_url = Report.post_url and Post.post_url = AttachedBy.post_url;
-- SELECT count(*) FROM AttachedBy WHERE post_url = 'thefat1.com';
-- SELECT count(*) FROM Post WHERE post_url = 'thefat1.com';

--tag: for each tag use in frontend, it will call endpoints to run following queries:
SELECT count(*) FROM Tag WHERE category='test';

-- if = 0, then new tag:
INSERT INTO Tag (category) VALUES('test');
SELECT count(*) FROM Tag WHERE category = 'test';

-- otherwise do nothing

-- Suppose the tags selected are pet, candy, test, other, and school
SELECT tag_id FROM Tag 
WHERE category = 'pet' OR category = 'candy' OR category = 'test'
OR category = 'other' OR category = 'school';

SELECT tag_id FROM AttachedBy WHERE tag_id IN (
SELECT tag_id FROM Tag 
WHERE category = 'pet' OR category = 'candy' OR category = 'test' OR category = 'other' OR category = 'school'
) and post_url = 'xyzahah.com';

-- insert tags which are newly added to the post(6, 7, 8) in this case
INSERT INTO AttachedBy(post_url, tag_id) 
VALUES('xyzahah.com', 6), ('xyzahah.com', 7), ('xyzahah.com', 8);

Select category from Tag where tag_id in (Select tag_id from AttachedBy where post_url = 'xyzahah.com');


-- Display Post:
-- Get posts given a page and per_page count
SELECT post_url, post_name, cost FROM Post ORDER BY update_date DESC LIMIT 5, 5;


-- ranking information for rank page
-- select user with top 3 most points
Select User.user_email, profile_pic_url, prof_description from User, Profile where User.user_email = Profile.user_email order by points Desc LIMIT 3;

-- select user with top 3 most uploaded pictures
Select user_email, profile_pic_url, prof_description from Profile order by post_count Desc LIMIT 3;

-- select pictures wuth 3 most like
Select post_name, post_url from Post order by like_count Desc Limit 3;

-- select pictures with 3 most download
Select post_name, post_url from Post order by download_count Desc Limit 3;


-- Queries need for setting account info page

-- Given that the current user is example2@gmail.com
Select points, User.user_email, profile_pic_url, prof_description, post_count from User, Profile where User.user_email ="example2@gmail.com" and User.user_email = Profile.user_email;

-- Show the most popular(like most) post from that user
Select post_url, post_name from Post where user_email = "example2@gmail.com" order by like_count, download_count Desc Limit 1;

-- Users are able to update their personal information if needed
Update Profile set prof_description = "new Description" where user_email = "example2@gmail.com";

-- To check the update command
Select * from Profile where user_email = "example2@gmail.com";

-- users are able to change their profile picture
Update Profile set profile_pic_url = "new_profile_url" where user_email = "example2@gmail.com";

-- To check the update command
Select * from Profile where user_mail = "example2@gmail.com";




-- SELECT count(*) FROM user WHERE user_secret = "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082";

-- SELECT count(*) FROM user WHERE points = 100;

-- SELECT user_secret FROM user WHERE user_email = "yiransun@gmail.com";

-- SELECT points FROM user WHERE user_email = "example3@outlook.com";

-- update User set points = 4 WHERE user_email = "example3@outlook.com";

-- SELECT points FROM user WHERE user_email = "example3@outlook.com";

-- -- profile

-- INSERT Into Profile (user_email, post_count) values ('yiran@waterloo.ca', 0); -- will fail

-- INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", "0"); -- will fail

-- INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", 0);

-- INSERT INTO Profile (user_email, post_count)  VALUES ("yiran@gmail.com", 0);

-- SELECT profile_pic_url, prof_description FROM Profile WHERE user = "yiransun@gmail.com" or user = "yiran@gmail.com";

-- SELECT count(*) FROM Profile WHERE post_count == 0;

-- Update Profile set profile_pic_url="example_url" WHERE user = "yiransun@gmail.com";

-- Update Profile set post_count = post_count + 1 WHERE user="yiran@gmail.com";

-- SELECT * FROM Profile WHERE user = "yiran@gmail.com" or user = "yiransun@gmail.com";

-- -- Post

-- INSERT Into Post (user_email, post_url, post_name, update_date, cost) Values('notExist@gmail.com', 'notExistUrl', "2008-11-11 13:23:44", 0); -- fail
-- INSERT INTO Post (user_email, post_url, post_name, update_date, cost) Values("example2@gmail.com", "thefat1.com","1000-01-01 00:00:00", 5); -- fail
-- INSERT INTO Post (user_email, post_url,post_name) Values("example2@gmail.com", "thefat10.com", "good name"); -- fail
-- INSERT INTO Post(user_email, post_url, post_name, update_date, cost) Values("newPicture@gmail.com", "theNewPicture.com", 'meme2', "1000-01-01 00:00:00", 20);
-- INSERT INTO Post Values("newPicture2@gmail.com", "theNewPicture2.com", 'meme2', "2008-11-11 13:23:44", 5, 0, 0, 1);
-- SELECT post_url FROM Post WHERE post_name = 'meme2';
-- Update Post set report_count = report_count + 1 WHERE post_url = "theNewPicture2.com";
-- SELECT report_count FROM Post WHERE post_url = "theNewPicture2.com";
-- Delete FROM Post WHERE post_url = "theNewPicture2.com";
-- SELECT * FROM Post WHERE post_url = "theNewPicture2.com";


-- -- Tag

-- Insert INTO tag(category)Values ("test");

-- -- for features:

-- -- Tags
-- -- input test:

-- SELECT count(*) FROM tag WHERE tag == 'test';
-- -- if 1 not inerted




