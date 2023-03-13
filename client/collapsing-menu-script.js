//-----collapsing menu-----//
//getting html elements to be changed
const chatMenu = document.getElementById('chat-menu');
const closeButton = document.getElementById('closebtn');
const openButton = document.getElementById('openbtn');
const menuButton = document.getElementById('menu-button');

//listen for mouse click
openButton.addEventListener('click', openNav);
closeButton.addEventListener('click', closeNav);

function openNav() {
    chatMenu.style.width = "250px";
    menuButton.style.marginLeft = "250px";
    //hide open button when menu is open
    openButton.style.display = "none";
}
  
function closeNav() {
    chatMenu.style.width = "0";
    menuButton.style.marginLeft = "0";
    openButton.style.display = "block";
}

//-----collapsing user information-----//
const buttonOpen = document.getElementById('open-user-info');
const buttonClose = document.getElementById('close-user-info');
const userInfo = document.getElementById('user-info');
const backgroundFade = document.querySelector('.message-container');

buttonOpen.addEventListener('click', openInfo);
buttonClose.addEventListener('click', closeInfo);

function openInfo() {
    userInfo.style.width = "300px";
    userInfo.style.height = "400px";
    buttonOpen.style.display = "none";
    backgroundFade.style.opacity = "0.5";
}

function closeInfo() {
    userInfo.style.width = "0";
    userInfo.style.height = "0";
    buttonOpen.style.display = "block";
    backgroundFade.style.opacity = "1";
}
