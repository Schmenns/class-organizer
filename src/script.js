const { BrowserWindowProxy } = require('electron');
const electron = require('electron');

class Class {
  constructor(subject, url) {
    this.subject = subject;
    this.url = url;

    Class.classes.push(this);
  }
}

let classes = [
  { label: 'English', url: 'https://meet.google.com' },
];

window.onload = () => {
  const container = document.querySelector('#class-container');
  classes.forEach(c => {
    const subcontainer = document.createElement('div');
    subcontainer.classList.add('class');

    const label = document.createElement('span');
    label.innerText = c.label;

    const image = document.createElement('img');
    image.src = 'Images/laptop.png';
    image.draggable = false;

    subcontainer.append(image, document.createElement('br'), label);
    container.append(subcontainer);

    subcontainer.onclick = () => electron.ipcRenderer.send('load-url', c.url); // Runs the code to change the url in index.js                                                                  
  });
};
