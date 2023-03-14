//load in sounds
var messageSound = new Audio('../assets/messageSound.mp3');
var errorSound = new Audio('../assets/errorSound.mp3');
var joinLeaveSound = new Audio('../assets/joinLeaveSound.mp3');
messageSound.load();
errorSound.load();
joinLeaveSound.load();

var socket = io('http://localhost:8000');

//getting username
userName = prompt("Welcome to VCE! Please enter a username 15 characters or smaller:");
if (!userName) {
    userName = 'User' + Math.round(Math.random() * 10000);
}

/*chrome.runtime.onStartup.addListener(function() {
    retrieveMessages();
});*/

socket.on('connect', () => {
    socket.emit('joined', userName);
});

//-----username checking-----//
socket.on('takenUsername', (userName) => {
    var takenNameError = document.getElementById('name-error-message');
    var backgroundFade = document.querySelector('.message-container');

    takenNameError.innerHTML = `Oops!! ${userName} is already taken!!`;

    takenNameError.classList.add('username-error');
    backgroundFade.style.opacity = '0.5';
    errorSound.play();

    setTimeout(function() {
        takenNameError.innerHTML = '';
        userName = prompt("Please enter a different username:");
        if (!userName) {
            userName = 'User' + Math.round(Math.random() * 10000);
        }
        socket.emit('joined', userName);
        takenNameError.classList.remove('username-error');
        backgroundFade.style.opacity = '1';
    }, 3000);
});

socket.on('longUsername', (userName) => {
    var takenNameError = document.getElementById('name-error-message');
    var backgroundFade = document.querySelector('.message-container');

    takenNameError.innerHTML = `Oops!! ${userName} is too long!!`;

    takenNameError.classList.add('username-error');
    backgroundFade.style.opacity = '0.5';
    errorSound.play();

    setTimeout(function() {
        takenNameError.innerHTML = '';
        userName = prompt("Please enter a username 15 characters or smaller:");
        if (!userName) {
            userName = 'User' + Math.round(Math.random() * 10000);
        }
        socket.emit('joined', userName);
        takenNameError.classList.remove('username-error');
        backgroundFade.style.opacity = '1';
    }, 3000);
});

//get messages from the html page
var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

form.onsubmit = function(e) {
    e.preventDefault();

    //handle empty messages
    if (input.value.length === 0) {
        //call error message function
        showErrorMessage(`Oops! You can't send an empty message!`);

        //error message timer - lasts for 3 seconds
        setTimeout(hideErrorMessage, 3000);
    } else {
        socket.emit('message', input.value);
        input.value = '';
        input.focus();
    }
}

socket.on('longMessage', function(msg) {
    showErrorMessage('Oops! Your message is too long!');
    setTimeout(hideErrorMessage, 3000);
});

//ensure each new message is on a new line
socket.on('message', function(msg, playSound, joinLeave) {
    if (playSound) {
        messageSound.play();
        console.log('sound played');
    }
    else if (joinLeave) {
        joinLeaveSound.play();
    }

    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    item.scrollIntoView();
});

//counting number of users
socket.on('userNumber', function(count) {
    var displayUsers = document.getElementById('user-number');
    displayUsers.innerHTML = 'Users in chat: ' + count;
});

//display all users in chat
socket.on('userList', function(users) {
    var allUsers = document.getElementById('users-in-chat');
    allUsers.innerHTML = 'Users: ' + users.join(', ');
});

//display current user
socket.on('currentUser', function(userName) {
    var currentUser = document.getElementById('current-user');
    currentUser.innerHTML = 'Chatting as: ' + userName;
});

//show error messages
function showErrorMessage(message) {
    var errorMessage = document.getElementById('error-messages');
    var fadeBackground = document.querySelector('.message-container');

    errorMessage.innerHTML = message;
    errorMessage.classList.add('chat-errors');

    //fade background so message is clearer
    fadeBackground.style.opacity = '0.5';
    errorSound.play();
}

//hide error messages
function hideErrorMessage() {
    var errorMessage = document.getElementById('error-messages');
    var fadeBackground = document.querySelector('.message-container');

    errorMessage.innerHTML = '';
    errorMessage.classList.remove('chat-errors');

    //return background to full opacity
    fadeBackground.style.opacity = '1';
}


