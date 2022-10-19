CREATE TABLE User (
    user_email VARCHAR(255) NOT NULL PRIMARY KEY,
    user_secret VARCHAR(300) NOT NULL,
    points INT NOT NULL
);
CREATE TABLE Profile (
    user_email VARCHAR(255) NOT NULL PRIMARY KEY,
    profile_pic_url VARCHAR(255),
    prof_description VARCHAR(255),
    post_count INT,
    FOREIGN KEY(user_email) REFERENCES User(user_email)
);
CREATE TABLE Post (
    user_email VARCHAR(255) NOT NULL,
    post_url VARCHAR(300) NOT NULL,
    post_name VARCHAR(255) NOT NULL,
    update_date DATETIME NOT NULL,
    download_count INT,
    like_count INT,
    cost INT NOT NULL,
    report_count INT,
    PRIMARY KEY(user_email, post_url),
    FOREIGN KEY(user_email) REFERENCES User(user_email)
);
CREATE TABLE Tag (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL
);
CREATE TABLE AttachedBy (
    user_email VARCHAR(255) NOT NULL,
    post_url VARCHAR(300) NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY(user_email, post_url, tag_id),
    FOREIGN KEY(user_email, post_url) REFERENCES Post(user_email, post_url),
    FOREIGN KEY(tag_id) REFERENCES Tag(tag_id)
);
CREATE TABLE Report (
    report_id INT NOT NULL AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL,
    post_url VARCHAR(300) NOT NULL,
    rep_description VARCHAR(255),
    create_date DATETIME NOT NULL,
    PRIMARY KEY(report_id, post_url, user_email),
    FOREIGN KEY(user_email, post_url) REFERENCES Post(user_email, post_url)
);
