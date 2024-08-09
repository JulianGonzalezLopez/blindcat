DROP DATABASE IF EXISTS blindcat;
CREATE DATABASE blindcat;
USE blindcat;

CREATE TABLE users (
    id VARCHAR(36) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL,
    cantidad_posts INT NOT NULL DEFAULT 0,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE posts (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(32) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    nsfw BOOLEAN DEFAULT FALSE,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opened INT NOT NULL DEFAULT 0,
    category VARCHAR(3) NOT NULL DEFAULT "gen",
    PRIMARY KEY(id)
);

CREATE TABLE comments (
    id INT NOT NULL AUTO_INCREMENT,
    content VARCHAR(300) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE posts_comments(
	post_id int not null,
    comment_id int not null,
    PRIMARY KEY(post_id, comment_id),
    FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users_comments(
	user_id varchar(36) not null,
    comment_id int not null,
    PRIMARY KEY(user_id,comment_id),
    FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE categories (
    tag VARCHAR(3) NOT NULL,
    name VARCHAR(32) NOT NULL,
    nsfw BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(tag)
);

INSERT INTO categories(tag, name) VALUES ("dep", "deportes");
INSERT INTO categories(tag, name) VALUES ("gen", "general");
INSERT INTO categories(tag, name) VALUES ("hen", "hentai");
INSERT INTO categories(tag, name) VALUES ("dev", "desarrollo");
INSERT INTO categories(tag, name) VALUES ("ani", "anime");

CREATE TABLE posts_categories (
    category_tag VARCHAR(3) NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(category_tag, post_id),
    FOREIGN KEY(category_tag) REFERENCES categories(tag) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE posts_tags (
    id INT AUTO_INCREMENT NOT NULL,
    post_id INT NOT NULL,
    tag VARCHAR(16),
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE users_posts (
    user_id VARCHAR(36) NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(user_id, post_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE opened_posts (
    post_id INT NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    PRIMARY KEY(post_id, user_id),
    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);