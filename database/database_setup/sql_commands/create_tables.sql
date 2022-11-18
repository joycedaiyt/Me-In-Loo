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
    report_count INT NOT NULL,
    PRIMARY KEY(post_url),
    FOREIGN KEY(user_email) REFERENCES User(user_email)
);

CREATE TABLE Tag (
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE AttachedBy (
    post_url VARCHAR(300) NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY(post_url, tag_id),
    FOREIGN KEY(post_url) REFERENCES Post(post_url),
    FOREIGN KEY(tag_id) REFERENCES Tag(tag_id)
);

CREATE TABLE Report (
    user_email VARCHAR(255) NOT NULL,
    post_url VARCHAR(300) NOT NULL,
    rep_description VARCHAR(255),
    create_date DATETIME NOT NULL,
    PRIMARY KEY(user_email, post_url),
    FOREIGN KEY(post_url) REFERENCES Post(post_url),
    FOREIGN KEY(user_email) REFERENCES User(user_email)
);

CREATE INDEX DisplayPostByUser ON POST (user_email);
