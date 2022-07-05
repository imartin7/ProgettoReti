CREATE DATABASE IF NOT EXISTS `todays-rrr`;
use `todays-rrr`;

/* Users table */
CREATE TABLE IF NOT EXISTS `users` (
    `id`            int(10) not null auto_increment primary key,
    `email`         varchar(50) not null unique,
    `username`      varchar(50) not null unique,
    `password`      varchar(750) default null,
    `name`          varchar(50) default null,
    `lastname`      varchar(50) default null,
    `image`         varchar(750) default null,
    `active`        tinyint(1) default null,
    `created_at`    datetime,
    `updated_at`    datetime
) ENGINE=InnoDb DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `user_images` (
    `userid`        int(10),
    `image`         varchar(750) default null,
    `created_at`    datetime,
    `updated_at`    datetime,
    FOREIGN KEY (userid)
        REFERENCES users(id)
) ENGINE=InnoDb DEFAULT CHARSET=utf8;