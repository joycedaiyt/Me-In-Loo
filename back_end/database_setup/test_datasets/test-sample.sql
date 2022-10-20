-- sign up and sign in

-- success signup
Select count(*) from User where user_email = "yiransun@gmail.com";

INSERT INTO User VALUES ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082", 15);

INSERT Into Profile(user_email) values ("yiransun@gmail.com");

-- fail signup due to duplicate
Select count(*) from User where user_email = "yiransun@gmail.com";

-- fail signup due to frontend did not pass enough data:
INSERT INTO User(user_email, user_secret) values ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082"); -- fail

-- successful signin or not
Select user_secret from User where (user_email = "yiransun@gmail.com");

-- if the result query is empty, raise incorrect user name error, if not check secret
-- check user secret to see if it equals to the secret which passed in as frontend, if so allow user to login, otherwise raise incorrect password error


-- Post:
-- upload picture failure:
INSERT INTO Post (user_email, post_url, update_date, cost) Values("example2@gmail.com", "thefat1010.com","1000-01-01 00:00:00", 5); -- fail if user does not provide name or frontend does not pass enough data
INSERT INTO Post (user_email, post_url, post_name, update_date, cost, report_count) Values("example2@gmail.com", "thefat1.com", 'failDueToNotUniqueUrl', "1000-01-01 00:00:00", 5, 0); -- fail due to replicate url
Select count(*) from Post;

-- upload 1 picture successfull:
Insert into Post (user_email, post_url, post_name, update_date, cost, report_count) values("example2@gmail.com", "newpic1.com", 'success_single', "1000-01-01 00:00:00", 5, 0);
Select * from Post where post_url = "newpic1.com";
select count(*) from Post where user_email = "example2@gmail.com";

update User set points = points + 2 where user_email = "example2@gmail.com";

Select points from User where user_email = "example2@gmail.com";
update Profile set post_count = post_count + 1 where user_email = "example2@gmail.com";
Select post_count from Profile where user_email = "example2@gmail.com";

-- Report submit failure due to same user report same post multiple times, and will only has one query
Select count(*) from Report where user_email = 'example3@outlook.com' and post_url="xyzahah.com";
Insert into Report (user_email, post_url, create_date) values('example3@outlook.com', 'xyzahah.com', "1000-01-01 00:00:00");
Select count(*) from Report where user_email = 'example3@outlook.com' and post_url="xyzahah.com";

-- Report submit success, but the report count does not met delete requirement:
Insert into Report (user_email, post_url, create_date) values('example4@qq.com', 'thefat2.com', "1000-01-01 00:00:00");
Select * from Report where user_email = 'example4@qq.com' and post_url = 'thefat2.com';
Update Post set report_count = report_count + 1 where post_url = 'thefat2.com';
Select report_count from Post where post_url = 'thefat2.com';

-- Report submit success, and the report count reach to be deleted:
Insert into Report (user_email, post_url, create_date) values('example3@outlook.com', 'thefat2.com', "1000-01-01 00:00:00");
Select * from Report;
Update Post set report_count = report_count + 1 where post_url = 'thefat2.com';
Select report_count from Post where post_url = 'thefat2.com';
-- find the owner to post, and store that user_email in backend
Select user_email from Post where post_url = 'thefat2.com';
Update User set points = points - 10 where user_email = 'example2@gmail.com';
Select points from user where user_email = 'example2@gmail.com';
Delete from Report where post_url = 'thefat2.com';
Delete from AttachedBy where post_url = "thefat2.com";
Delete from Post where post_url = "thefat2.com";
Select count(*) from Report where post_url = 'thefat2.com';
Select count(*) from AttachedBy where post_url = 'thefat2.com';
Select count(*) from Post where post_url = 'thefat2.com';

--tag: for each tag use in frontend, it will call endpoints to run following queries:
Select count(*) from Tag where category='test';

-- if = 0, then new tag:
Insert into Tag (category) values('test');
Select count(*) from Tag where category = 'test';

-- otherwise do nothing

-- Once all tags have been attached to post:
-- Suppose the tags selected are animal, celebrity, sport, school, test
Select tag_id from Tags where (category = 'animal' or category = 'celebrity' or category = 'sport' or category = 'school' or category = 'test') and tag_id not in (Select tag_id from AttachedBy where post_url = 'xyzahah.com');
-- the above query will only return tags which have not been attached to given post
Insert into AttachedBy(post_url, tag_id) VALUES ('xyzahah.com', 8);
Select tag_id from AttachedBy where  post_url = 'xyzahah.com';

-- Select count(*) from user where user_secret = "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082";

-- Select count(*) from user where points = 100;

-- Select user_secret from user where user_email = "yiransun@gmail.com";

-- Select points from user where user_email = "example3@outlook.com";

-- update User set points = 4 where user_email = "example3@outlook.com";

-- Select points from user where user_email = "example3@outlook.com";

-- -- profile

-- INSERT Into Profile (user_email, post_count) values ('yiran@waterloo.ca', 0); -- will fail

-- INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", "0"); -- will fail

-- INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", 0);

-- INSERT INTO Profile (user_email, post_count)  VALUES ("yiran@gmail.com", 0);

-- Select profile_pic_url, prof_description from Profile where user = "yiransun@gmail.com" or user = "yiran@gmail.com";

-- Select count(*) from Profile where post_count == 0;

-- Update Profile set profile_pic_url="example_url" where user = "yiransun@gmail.com";

-- Update Profile set post_count = post_count + 1 where user="yiran@gmail.com";

-- Select * from Profile where user = "yiran@gmail.com" or user = "yiransun@gmail.com";

-- -- Post

-- INSERT Into Post (user_email, post_url, post_name, update_date, cost) Values('notExist@gmail.com', 'notExistUrl', "2008-11-11 13:23:44", 0); -- fail
-- INSERT INTO Post (user_email, post_url, post_name, update_date, cost) Values("example2@gmail.com", "thefat1.com","1000-01-01 00:00:00", 5); -- fail
-- INSERT INTO Post (user_email, post_url,post_name) Values("example2@gmail.com", "thefat10.com", "good name"); -- fail
-- INSERT INTO Post(user_email, post_url, post_name, update_date, cost) Values("newPicture@gmail.com", "theNewPicture.com", 'meme2', "1000-01-01 00:00:00", 20);
-- INSERT INTO Post Values("newPicture2@gmail.com", "theNewPicture2.com", 'meme2', "2008-11-11 13:23:44", 5, 0, 0, 1);
-- Select post_url from Post where post_name = 'meme2';
-- Update Post set report_count = report_count + 1 where post_url = "theNewPicture2.com";
-- Select report_count from Post where post_url = "theNewPicture2.com";
-- Delete From Post where post_url = "theNewPicture2.com";
-- Select * from Post where post_url = "theNewPicture2.com";


-- -- Tag

-- Insert INTO tag(category)Values ("test");

-- -- for features:

-- -- Tags
-- -- input test:

-- Select count(*) from tag where tag == 'test';
-- -- if 1 not inerted




