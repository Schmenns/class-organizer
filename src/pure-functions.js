const ask = (question, callback) => {
  const container = Object.assign(document.createElement('div'), { id: 'ask-container', });
  const subcontainer = Object.assign(document.createElement('div'), { id: 'ask-subcontainer', });
  const background = Object.assign(document.createElement('div'), { id: 'ask-background', });
  const text = Object.assign(document.createElement('h3'), { id: 'ask-text', innerText: question, });
  const inputName = Object.assign(document.createElement('input'), { id: 'ask-input-name', placeholder: 'Name' });
  const inputURL = Object.assign(document.createElement('input'), { id: 'ask-input-URL', placeholder: 'URL for the meet' });
  const imageInput = Object.assign(document.createElement('input'), { id: 'ask-image-input', type: 'file' });
  const imageInputLabel = Object.assign(document.createElement('label'), { id: 'ask-image-input-label', for: 'ask-image-input', innerText: 'Choose a file for the icon', });
  const subcontainerRealitive = Object.assign(document.createElement('div'), { id: 'ask-subcontainer-relative' });
  const cancel = Object.assign(document.createElement('button'), { id: 'ask-cancel', innerText: '×' });
  const submit = Object.assign(document.createElement('button'), { id: 'ask-submit', innerText: 'Submit', });
  imageInputLabel.onclick = () => imageInput.click(); // Clicking the label clicks the input
  
  let labelValue = imageInputLabel.innerHTML; // The labels text is the innerHTML of the label so its easier to use
  imageInput.onchange = () => { // When you select an image or "change" the input
    let fileName;
    if(this.files) fileName = this.files[0].name;
    if(fileName !== '') imageInputLabel.innerText = fileName; // If there is a file name then make the labels text the files name
    else imageInputLabel.innerHTML = labelValue; // Else set the labels text back to the original text
  };

  cancel.onclick = () => { container.remove(); }
  submit.onclick = () => { // When you click submit run the callback function
    container.remove();
    callback(inputName.value, imageInput.files[0].path, inputURL.value);
  }

  subcontainerRealitive.append(cancel, text, inputName, inputURL, document.createElement('br'), imageInputLabel, document.createElement('br'), submit);
  subcontainer.append(subcontainerRealitive);
  container.append(background, subcontainer);
  document.body.append(container);
}
