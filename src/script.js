const { BrowserWindowProxy } = require('electron');
const electron = require('electron');

let classes = [
  { label: 'English', url: 'meet.google.com/hsq-jqob-nmu' },
];

window.onload = loadClasses = () => {
  const container = document.querySelector('#class-container'); // Bar on top where the classes are
  while(container.children.length > 0) container.children[0].remove();
  
  classes.forEach(c => { // Makes a button for each class in the classes list
    const subcontainer = document.createElement('div');
    subcontainer.classList.add('class');

    const label = document.createElement('span'); // The text for what the class is called
    label.innerText = c.label;

    const image = document.createElement('img'); // The image for the class
    image.classList.add('class-image');
    image.src = c.image ? c.image : 'Images/laptop.png';
    image.draggable = false;

    subcontainer.append(image, document.createElement('br'), label);
    container.append(subcontainer);

    subcontainer.onclick = () => electron.ipcRenderer.send('load-url', c.url); // Runs the code to change the url in index.js
  });
};

const addClass = document.querySelector('#class-add'); // Add Class Button
addClass.onclick = () => {
  ask('Create a Class', (name, image, URL) => {
    classes.push({ label: name, image: image, url: `https://${URL.split('https://').pop().split('www.').pop()}`, });
    loadClasses();
  });
}
addClass.onclick();
