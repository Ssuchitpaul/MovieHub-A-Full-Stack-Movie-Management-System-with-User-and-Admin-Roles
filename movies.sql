CREATE DATABASE NODE;


USE NODE;

CREATE TABLE movies (
    id INT  PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_year INT,
    duration_minutes INT,
    rating FLOAT,
    poster_image VARCHAR(255),
    box_office_total DECIMAL(15, 2)
);



INSERT INTO movies 
VALUES (1, 'hulk Smash', 'Chris', 'Sci-Fi', 2010, 148, 9.0, 'https://shorturl.at/v5yw0', 850000000.00);

INSERT INTO movies 
VALUES (2, 'The Godfather', 'Francis Ford Coppola', 'Crime', 19799, 175, 9.2, 'https://shorturl.at/QG22j', 246120974.00);

INSERT INTO movies 
VALUES (3, 'THOR', 'Quentin Tarantino', 'Crime', 1994, 154, 8.9, 'https://shorturl.at/v0lFV', 213928762.00);

INSERT INTO movies 
VALUES (4, 'Interstaller', 'Christopher Nolan', 'Sci-Fi', 2010, 148, 9.0, 'https://rb.gy/pk5f7f', 850000000.00);

INSERT INTO movies 
VALUES (5, 'Inception', 'Christopher Nolan', 'Sci-Fi', 2010, 148, 9.0, 'https://rb.gy/2eezz7', 850000000.00);

INSERT INTO movies 
VALUES (6, 'iron man', 'Logan', 'sci-fi', 2010, 48893, 10.0, 'https://shorturl.at/815lL', 1232.00);

INSERT INTO movies 
VALUES (7, 'Joker', 'Joaquin', 'drama', 2019, 185, 8.0, 'https://rb.gy/mhxlzx', 123424.00);


create table users(id int auto_increment primary key,username varchar(100), email varchar(100), password varchar(100),role varchar(100));

INSERT INTO users (username, email, password, role) 
VALUES 
('Alice', 'alice@example.com', 'password123', 'admin'),
('Bob', 'bob@example.com', 'password456', 'user'),
('Charlie', 'charlie@example.com', 'password789', 'user'),
('Dave', 'dave@example.com', 'password101112', 'admin'),
('Eve', 'eve@example.com', 'password131415', 'user');

create table fav (userid int,movieid int,movie varchar(100));


create table req(userid int,movieid int,movie varchar(100),status varchar(100));

select * from req;

SELECT * FROM MOVIES;

select * from fav;

select *from users;

