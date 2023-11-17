# VCE-computing-project-2
Creating a Google Chrome extension with the goal of allowing Goldsmiths students to chat within the university's Virtual Learning Environment, VCE = Virtual Chat Environment.

## Project Demo

https://github.com/keeley1/VCE-computing-project-2/assets/116581328/fab63f35-b21a-4151-96e1-3799de743e50

### Contributors:
- Keeley Gardner

### Prerequisites
Before running the project, the following must be downloaded onto your machine.
- Node.js
- MySQL

## How to Run 
Once you have downloaded the project onto your local machine:

### Set up MySQL
Before running the project, you need to create the database to be used in MySQL. Within the "utils/creating-db.sql" file are the queries needed to set it up.
```
#follow steps to create the correct database in sql to save messages

CREATE DATABASE IF NOT EXISTS virtual_chat_extension;
USE virtual_chat_extension;

CREATE TABLE messages (id INT AUTO_INCREMENT, username VARCHAR(255) NOT NULL, message TEXT NOT NULL, message_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));

#create user for database
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON virtual_chat_extension.* TO 'test_user'@'localhost';
```

### Running the project
Now that the database is set up, open the project back up in Visual Studio Code and open a new terminal. In the terminal run:
```
node index.js
```
If the project is running in the terminal, open up Google Chrome and navigate to "chrome://extensions/". Turn on the developer mode toggle in the corner and then select "load unpacked". You can then navigate to the directory in which you placed the project and select it. The project should then appear in your list of extensions. Now you can test and pin the project to the navbar.

<img src="/assets/chrome-extension-image.png" width="300">

If you have got everything working correctly, the chrome extension homepage should look like the following:

<img src="/assets/version1-image.png" width="300">

