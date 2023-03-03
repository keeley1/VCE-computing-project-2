const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const connection = require("./utils/db-connection");

// Direct express where to pick up the files
app.use(express.static(__dirname));

let playSound = true;
let joinLeave = true;

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL database!');
  });

  function retrieveMessages(callback) {
    const retrieveMessagesSql = `SELECT * FROM messages`;
    connection.query(retrieveMessagesSql, (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  }
  module.exports = {
    retrieveMessages
    };

//user counting 
let userNumber = 0;
let users = new Array();

io.on('connection', (socket) => {
    console.log('new client connected!');
    //count number of users
    userNumber++;
    io.emit('userNumber', userNumber);

    retrieveMessages((err, messages) => {
        if (err) throw err;
        messages.forEach((message) => {
            socket.emit('message', `${message.username}: ${message.message}`, playSound = false, joinLeave = false);
        });
    });

    var userName;
    socket.on('joined', (who) => {
        userName = who;
        //error handling for same username being entered
        if (users.includes(userName)) {
            console.log(`${userName} is taken!`);
            socket.emit('takenUsername', userName);
            return;
        }
        //error handling for too long username
        if (userName.length > 15) {
            console.log(`username too long`);
            socket.emit('longUsername', userName);
        }
        else {
            //welcome user after 2 seconds
            setTimeout(function(){
                socket.emit('message', 'Welcome to VCE!');
            }, 2000);

            users.push(userName);
            io.emit('userList', users);
            console.log(`${userName} joined`);
            console.log(`current users: ${users}`);

            //emit when user joins the chat
            socket.broadcast.emit('message', `${who} joined the chat`, playSound = false, joinLeave = true);
        }
    });
    socket.on('message', (msg, playSound, joinLeave) => {
        if (msg.length <= 250) {
            console.log(`Received message from ${userName}`);    

            const insertMessageSql = `INSERT INTO messages (username, message) VALUES (?, ?)`;
            const values = [userName, msg];
        
            connection.query(insertMessageSql, values, (err, result) => {
                if (err) throw err;
                console.log(`Successfully inserted message into the database`);
            });

            //emit the message to users in the room + the username
            io.emit('message', `${userName}: ${msg}`, playSound = true, joinLeave = false);
        }
        else {
            socket.emit('longMessage', msg);
        }
    });
    socket.on('file', (fileData) => {
        io.emit('file', fileData);
    });
    socket.on('disconnect', () => {
        let index = users.indexOf(userName);
        if (index > -1) {
            users.splice(index, 1);
        }
        console.log(`current users: ${users}`);
        io.emit('userList', users);

        io.emit('message', `${userName} has left the chat`, playSound = false, joinLeave = true);
        userNumber--;
        io.emit('userNumber', userNumber);
    });
});


server.listen(8000, () => {
    console.log('Server listening on port 8000');
});




