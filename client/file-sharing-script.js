const incomingFile = document.getElementById('incoming-file');

incomingFile.addEventListener('change', (event) => {
    const file = event.target.files[0];
    sendFile(file);
});

socket.on('file', (fileData) => {
    const fileLink = document.createElement('a');
    fileLink.href = fileData.urlData;
    fileLink.download = fileData.name;
    fileLink.textContent = `Download ${fileData.name}`;

    //styling the link to download file
    fileLink.style.color = 'black';

    //styling on mouse hover
    fileLink.addEventListener('mouseenter', () => {
        fileLink.style.color = 'gray';
    });

    fileLink.addEventListener('mouseleave', () => {
        fileLink.style.color = 'black';
    });

    const listItem = document.createElement('li');
    listItem.appendChild(fileLink);

    const messages = document.getElementById('messages');
    messages.appendChild(listItem);
    listItem.scrollIntoView();
});

function sendFile(file) {
    const reader = new FileReader();

    reader.onload = () => {
        const urlData = reader.result;
        const fileData = {
            name: file.name,
            type: file.type,
            urlData
        };
        socket.emit('file', fileData);
    };
    reader.readAsDataURL(file);
};