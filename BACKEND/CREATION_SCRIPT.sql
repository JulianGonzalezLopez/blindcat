DROP DATABASE blindcat;
CREATE DATABASE blindcat;
USE blindcat;

CREATE TABLE users(
    id varchar(36) NOT NULL,
    username varchar(16) NOT NULL,
    password varchar(16) NOT NULL,
    cantidad_posts INT NOT NULL DEFAULT 0,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE posts(
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(32) NOT NULL,
    content varchar(1000) NOT NULL,
    nsfw boolean DEFAULT FALSE, 
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    opened int not null DEFAULT 0,
    category varchar(3) not null DEFAULT "gen",
    PRIMARY KEY(id)
);

CREATE TABLE comments(
    id int not null AUTO_INCREMENT,
    content varchar(300) NOT NULL,
    creator_id varchar(36) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(creator_id) REFERENCES users(id)
);

CREATE TABLE categories(
    tag varchar(3) not null,
    name varchar(32) not null,
    nsfw boolean DEFAULT FALSE, 
    PRIMARY KEY(tag)
);

INSERT INTO categories(tag,name) values("dep","deportes");
INSERT INTO categories(tag,name) values("gen","general");
INSERT INTO categories(tag,name) values("hen","hentai");
INSERT INTO categories(tag,name) values("dev","desarrollo");
INSERT INTO categories(tag,name) values("ani","anime");


CREATE TABLE posts_categories(
    category_tag varchar(3) not null,
    post_id int not null,
    PRIMARY KEY(category_tag,post_id),
    FOREIGN KEY(category_tag) REFERENCES categories(tag),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE posts_comments(
    comment_id INT NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(comment_id,post_id),
    FOREIGN KEY(comment_id) REFERENCES comments(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE posts_tags(
	ID INT AUTO_INCREMENT NOT NULL,
    post_id INT NOT NULL,
    tag varchar(16),
    PRIMARY KEY(id),
    FOREIGN KEY(post_id) references posts(id)
);

CREATE TABLE users_posts(
    user_id varchar(36) NOT NULL,
    post_id INT NOT NULL,
    PRIMARY KEY(user_id,post_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id)
);

CREATE TABLE opened_posts(
    post_id INT NOT NULL,
    user_id varchar(36) NOT NULL,
    PRIMARY KEY(post_id,user_id),
    FOREIGN KEY(post_id) REFERENCES posts(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);