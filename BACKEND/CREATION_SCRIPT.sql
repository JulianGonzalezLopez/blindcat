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
    likes INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id)
);

CREATE TABLE users_posts(
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(user_id,post_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);