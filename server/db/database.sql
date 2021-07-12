CREATE DATABASE book_rental;

CREATE TABLE user_account(
  user_id SERIAL PRIMARY KEY,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
);

CREATE TABLE user_roles(
  user_id INTEGER NOT NULL,
  role_id INTEGER NOT NULL,
  role_desc TEXT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user_account(user_id),
  PRIMARY KEY(user_id, role_id)
);
