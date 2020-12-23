const { BrowserWindowProxy } = require('electron');
const electron = require('electron');

const addClass = document.querySelector('#class-add');

class Class {
  constructor(subject, url) {
    this.subject = subject;
    this.url = url;

    Class.classes.push(this);
  }
}

let classes = [
  { label: 'English', url: 'https://meet.google.com/hsq-jqob-nmu' },
];

const ask = question => {
  const container = Object.assign(document.createElement('div'), { id: 'ask-container' });
  const subcontainer = Object.assign(document.createElement('div'), { id: 'ask-subcontainer' });
  const background = Object.assign(document.createElement('div'), { id: 'ask-background' });

  const text = Object.assign(document.createElement('h3'), { id: 'ask-text', innerText: question });
  const input = Object.assign(document.createElement('input'), { id: 'ask-input' });

  const imageInput = Object.assign(document.createElement('input'), { id: 'ask-image-input', type: 'file' });
  const imageInputLabel = Object.assign(document.createElement('label'), { id: 'ask-image-input-label', for: 'ask-image-input' });
  imageInputLabel.onclick = () => imageInput.click();

  const submit = Object.assign(document.createElement('button'), { id: 'ask-submit', innerText: 'Submit' })

  subcontainer.append(text, input, document.createElement('br'), imageInputLabel, document.createElement('br'), submit);
  container.append(background, subcontainer);

  document.body.append(container);
  
  submit.onclick = () => {
    console.log('eodgijkm')
    container.remove();
  }
}

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


addClass.onclick = () => {
  ask('What is the class called?')
  document.querySelector('#ask-submit').onclick = () => {
    document.querySelector('#ask-container').remove;
  }
}
