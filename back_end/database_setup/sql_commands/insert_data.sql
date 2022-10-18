INSERT INTO User (user_email, user_secret, points) 
VALUES (%s, %s, %s);

INSERT INTO Tag (tag_id, category) 
VALUES (%s, %s);

INSERT INTO Profile (user_email, profile_pic_url, prof_description, post_count) 
VALUES (%s, %s, %s, %s);

INSERT INTO Post (user_email, post_url, post_name, update_date, download_count, like_count, cost, report_count) 
VALUES (%s, %s, %s, %s, %s, %s, %s, %s);

INSERT INTO AttachedBy (user_email, post_url, tag_id) 
VALUES (%s, %s, %s);

INSERT INTO Report (report_id, post_url, user_email, description, create_date) 
VALUES (%s, %s, %s, %s, %s);
