CREATE DATABASE book_rental;

CREATE TABLE user_account(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role text NOT NULL
);