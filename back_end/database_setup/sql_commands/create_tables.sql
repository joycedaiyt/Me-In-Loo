create table User (
    user_email varchar(255) NOT NULL PRIMARY KEY,
    user_secret varchar(6666) NOT NULL,
    points int NOT NULL
);

create table Profile (
    user_email varchar(255) NOT NULL PRIMARY KEY,
    profile_pic_url varchar(255),
    prof_description varchar(255),
    post_count int,
    Foreign key(user_email) References User(user_email)
);

create table Post (
	post_id int Not NULL, auto_increment,
    post_url varchar(6666) Not NULL,
    user_email varchar(255) NOT NULL,
    name varchar(255),
    upload_date datetime,
    download_count int,
    cost int,
    like_count int,
    report_count int,
    Foreign key(user_email) References User(user_email)
);

create table Tag (
    tag_name varchar(255) Not NULL Primary Key,
    post_id int not null,
    Foreign key(post_id) References Post(post_id)
);

create table Report (
    report_id int NOT NULL Primary Key AUTO_INCREMENT,
    post_id int Not NULL,
    description varchar(255),
    create_date datetime,
    Foreign key(post_id) References Post(post_id)
);


