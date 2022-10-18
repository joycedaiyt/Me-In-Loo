create table User (
    email varchar(255) NOT NULL PRIMARY KEY,
    points int NOT NULL
);

create table SecretID (
    secret_id int Not NULL PRIMARY KEY AUTO_INCREMENT,
    hash_pwd varchar(255),
    secret_content varchar(255),
    email varchar(255),
    Foreign key(email) References User(email)
);

create table Profile (
    email varchar(255) NOT NULL PRIMARY KEY,
    profile_pic varchar(255),
    description varchar(255),
    post_count int,
    Foreign key(email) References User(email)
);

create table Post (
	post_id int Not NULL Primary key auto_increment,
    post_url varchar(6666) Not NULL,
    email varchar(255) NOT NULL,
    name varchar(255),
    upload_date datetime,
    download_count int,
    cost int,
    like_count int,
    report_count int,
    Foreign key(email) References User(email)
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


