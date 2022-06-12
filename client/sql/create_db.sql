/* Users table */
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id`            int(10) not null auto_increment primary key,
    `email`         varchar(255) not null unique,
    `username`      varchar(255) not null unique,
    `password`      varchar(255) default null,
    `name`          varchar(255) default null,
    `lastname`      varchar(255) default null,
    `image`         varchar(255) default null,
    `active`        tinyint(1) default null,
    `created_at`    datetime,
    `updated_at`    datetime
) ENGINE=InnoDb DEFAULT CHARSET=utf8;