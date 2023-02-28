# VCE-computing-project-2
Creating a Google Chrome extension with the goal of allowing Goldsmiths students to chat within the university's Virtual Learning Environment, VCE = Virtual Chat Environment.

### Group members: 
- Keeley Gardner
- Jake Foster
- Arooj Ali
- Faizaan Ahmed
- Tiya Anderson

### Prerequisites
Before running the project, the following must be downloaded onto your machine.
- GitHub desktop
- Node.js
- MySQL

## How to Run 
Open the repo onto GitHub desktop and then you will be able to open in Visual Studio code, this is the best way to open as any changes you make in Visual Studio code will automatically appear in GitHub desktop ready to be committed. Alternatively you can clone or get a zip file of the repo.

### Setting up MySQL
Before running the project, you need to create the database to be used in MySQL. The following guides you through this on the command line:

If you are on a windows machine, you can open up the MySQL command line client. If you are on a mac, open the terminal and use the following to open MySQL:
```
/usr/local/mysql/bin/mysql -u root -p 
```
You will then be directed to enter your root password that you should have set up upon downloading MySQL onto your machine.

Once you have MySQL up and running, execute the following to create the database:
```
CREATE DATABASE IF NOT EXISTS virtual_chat_extension;
USE virtual_chat_extension;
```
Then to create the table:
```
CREATE TABLE messages IF NOT EXISTS (id INT AUTO_INCREMENT, username VARCHAR(255) NOT NULL, message TEXT NOT NULL, message_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));
```
Finally, we need to create a user for the database:
```
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON virtual_chat_extension.* TO 'test_user'@'localhost';
```
By running this:
```
DESCRIBE messages;
```
We can check that the table was successfully created.

### Running the project
Now that the database is set up, open the project back up in Visual Studio Code and open a new terminal. In the terminal run:
```
node index.js
```
If the project is running in the terminal, open up Google Chrome and navigate to "chrome://extensions/". Turn on the developer mode toggle in the corner and then select "load unpacked". You can then navigate to the directory in which you placed the project and select it. The project should then appear in your list of extensions. Now you can test and pin the project to the navbar.

If you have got everything working correctly, the chrome extension homepage shoulf look like the following:

<img src="/assets/version1-image.png" width="300">

