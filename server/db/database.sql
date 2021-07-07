CREATE DATABASE book_rental;

CREATE TABLE user_account(
    user_id SERIAL PRIMARY KEY,
    email citext UNIQUE,
    password varchar(255),
    role text
);