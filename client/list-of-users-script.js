//wait for html content to load before executing
document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const userInfo = document.getElementById('user-info-style');
    const closeButton = document.getElementById('close-list');
  
    //listen for clicks to user info
    userInfo.addEventListener('click', () => {
      userContainer.style.display = 'block';
    });
  
    //listen for clicks to close button
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        userContainer.style.display = 'none';
      });
    }
});
  