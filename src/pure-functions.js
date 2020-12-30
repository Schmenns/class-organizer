const createLayout = (data, elmt) => {
  data.forEach(el => {
    if (!el.tag) return;
    let c = document.createElement(el.tag);
    Object.keys(el).forEach(prop => {
      switch (prop) {
        case 'content':
          c.innerText = el.content;
          break;
        case 'style':
          Object.assign(c.style, el.style);
          break;
        case 'class':
          el.class.forEach(cl => c.classList.add(cl));
          break;
        case 'children':
          createLayout(el.children, c);
          break;
        default:
          c[prop] = el[prop];
          break;
      }
    });
    elmt.appendChild(c);
  });
}
/* EXAMPLE
createLayout([
	{
		tag: 'div',
		style: {
			backgroundColor: 'red',
		},
		children: [
			{
				tag: 'h1',
				content: 'h1 tag 1',
			},
			{
				tag: 'h1',
				content: 'h1 tag 2',
			}
		],
	}
], document.body);
*/



class Class {
  constructor(subject, url) {
    this.subject = subject;
    this.url = url;

    Class.classes.push(this);
  }
}

let inputImageFile;
const ask = (question, callback) => {
  const container = Object.assign(document.createElement('div'), { id: 'ask-container' });
  const subcontainer = Object.assign(document.createElement('div'), { id: 'ask-subcontainer' });
  const background = Object.assign(document.createElement('div'), { id: 'ask-background' });
  const text = Object.assign(document.createElement('h3'), { id: 'ask-text', innerText: question });
  const input = Object.assign(document.createElement('input'), { id: 'ask-input' });
  const imageInput = Object.assign(document.createElement('input'), { id: 'ask-image-input', type: 'file' });
  const imageInputLabel = Object.assign(document.createElement('label'), { id: 'ask-image-input-label', for: 'ask-image-input', innerText: 'Choose a file for the icon' });
  const submit = Object.assign(document.createElement('button'), { id: 'ask-submit', innerText: 'Submit' });
  imageInputLabel.onclick = () => imageInput.click(); // Clicking the label clicks the input
  
  let labelValue = imageInputLabel.innerHTML; // The labels text is the innerHTML of the label so its easier to use
  imageInput.onchange = function(event) { // When you select an image or "change" the input
    let fileName = '';
    if(this.files) fileName = event.target.value.split('\\').pop(); // Get only the file name and get rid of the rest of the directory
    imageInputFile = event.target.value;

    if(fileName !== '') imageInputLabel.innerText = fileName; // If there is a file name then make the labels text the files name
    else imageInputLabel.innerHTML = labelValue; // Else set the labels text back to the original text
  };

  submit.onclick = () => { // When you click submit run the callback function
    container.remove();
    callback(input.value, imageInput.files)
  }

  subcontainer.append(text, input, document.createElement('br'), imageInputLabel, document.createElement('br'), submit);
  container.append(background, subcontainer);
  document.body.append(container);
}
