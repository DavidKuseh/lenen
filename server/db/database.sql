CREATE DATABASE book_rental;

CREATE TABLE user_account(
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_role text NOT NULL
);
