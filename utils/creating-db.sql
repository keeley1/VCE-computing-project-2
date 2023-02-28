#follow steps to create the correct database in sql to save messages

CREATE DATABASE IF NOT EXISTS virtual_chat_extension;
USE virtual_chat_extension;

CREATE TABLE messages IF NOT EXISTS (id INT AUTO_INCREMENT, username VARCHAR(255) NOT NULL, message TEXT NOT NULL, message_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));

#create user for database
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON virtual_chat_extension.* To 'test_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON virtual_chat_extension.* TO 'test_user'@'localhost';
