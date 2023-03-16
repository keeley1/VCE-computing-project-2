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

