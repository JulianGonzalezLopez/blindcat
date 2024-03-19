CREATE DATABASE blindcat;
USE blindcat;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username varchar(16) NOT NULL,
    password varchar(16) NOT NULL,
    cantidad_posts INT NOT NULL DEFAULT 0,
    karma INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(32) NOT NULL,
    content varchar(1000) NOT NULL,
    nsfw boolean DEFAULT FALSE, 
    creation_date DATETIME NOT NULL,
    opened int not null DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE comments(
    id int not null AUTO_INCREMENT,
    content varchar(300) NOT NULL,
    creator_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(creator_id) REFERENCES users(id)
);

CREATE TABLE posts_comments(
    comment_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(comment_id,post_id),
    FOREIGN KEY(comment_id) REFERENCES comments(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE posts_tags(
	ID INT auto_increment NOT NULL,
    post_id INT NOT NULL,
    tag varchar(16),
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) references posts(id)
);

CREATE TABLE users_posts(
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(user_id,post_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);