-- sign up and sign in

-- success signup
Select count(*) from user where user_email = "yiransun@gmail.com";

INSERT INTO User VALUES ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082", 100);

-- fail signup due to duplicate
Select count(*) from user where user_email = "yiransun@gmail.com";

-- fail signup due to frontend did not pass enough data:
INSERT INTO User(user_email, user_secret) values ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082"); -- fail

-- successful signin
Select user_secret from User where (user_email = "yiransun@gmail.com");




-- user and profile
-- user(we don't expect user update their password in current stage, might give user ability to change their password later):
Select count(*) from user where user_email = "yiransun@gmail.com";

INSERT INTO User VALUES ("yiransun@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082", 100);

Select count(*) from user where user_email = "yiransun@gmail.com"

INSERT InTO User (user_email) Values("yiransun@gmail.com"); -- will fail

INSERT Into User (user_email) Values("yiran@gmail.com", "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082", 100);

Select count(*) from user where user_email = "yiransun@gmail.com";

Select count(*) from user where user_secret = "D1e8a70b5ccab1dc2f56bbf7e99f064a660c08e361a35751b9c483c88943d082";

Select count(*) from user where points = 100;

Select user_secret from user where user_email = "yiransun@gmail.com";

Select points from user where user_email = "example3@outlook.com";

update User set points = 4 where user_email = "example3@outlook.com";

Select points from user where user_email = "example3@outlook.com";

-- profile

INSERT Into Profile (user_email, post_count) values ('yiran@waterloo.ca', 0); -- will fail

INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", "0"); -- will fail

INSERT INTO Profile (user_email, post_count) VALUES ("yiransun@gmail.com", 0);

INSERT INTO Profile (user_email, post_count)  VALUES ("yiran@gmail.com", 0);

Select profile_pic_url, prof_description from Profile where user = "yiransun@gmail.com" or user = "yiran@gmail.com";

Select count(*) from Profile where post_count == 0;

Update Profile set profile_pic_url="example_url" where user = "yiransun@gmail.com";

Update Profile set post_count = post_count + 1 where user="yiran@gmail.com";

Select * from Profile where user = "yiran@gmail.com" or user = "yiransun@gmail.com";

-- Post

INSERT Into Post (user_email, post_url, post_name, update_date, cost) Values('notExist@gmail.com', 'notExistUrl', "2008-11-11 13:23:44", 0); -- fail
INSERT INTO Post (user_email, post_url, post_name, update_date, cost) Values("example2@gmail.com", "thefat1.com","1000-01-01 00:00:00", 5); -- fail
INSERT INTO Post (user_email, post_url,post_name) Values("example2@gmail.com", "thefat10.com", "good name"); -- fail
INSERT INTO Post(user_email, post_url, post_name, update_date, cost) Values("newPicture@gmail.com", "theNewPicture.com", 'meme2', "1000-01-01 00:00:00", 20);
INSERT INTO Post Values("newPicture2@gmail.com", "theNewPicture2.com", 'meme2', "2008-11-11 13:23:44", 5, 0, 0, 1);
Select post_url from Post where post_name = 'meme2';
Update Post set report_count = report_count + 1 where post_url = "theNewPicture2.com";
Select report_count from Post where post_url = "theNewPicture2.com";
Delete From Post where post_url = "theNewPicture2.com";
Select * from Post where post_url = "theNewPicture2.com";


-- Tag

Insert INTO tag(category)Values ("test");

-- for features:

-- Tags
-- input test:

Select count(*) from tag where tag == 'test';
-- if 1 not inerted


