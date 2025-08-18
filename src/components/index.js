import '../main.css';
import './FormComponent.js';
import './NotesList.js';
import { CustomFormRequest } from '../../request/FormRequest.js';

const formComp = document.querySelector('form-component');
const form = formComp.querySelector('form#noteForm');
const titleInput = form.elements['title'];
const contentInput = form.elements['content'];

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

titleInput.addEventListener('change', CustomFormRequest);
titleInput.addEventListener('invalid', CustomFormRequest);
contentInput.addEventListener('change', CustomFormRequest);
contentInput.addEventListener('invalid', CustomFormRequest);
titleInput.addEventListener('input', CustomFormRequest);
contentInput.addEventListener('input', CustomFormRequest);


titleInput.addEventListener('blur', (event) => {
  // Validate the field
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;
  console.log(errorMessage);

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {7
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});

contentInput.addEventListener('blur', (event) => {
  // Validate the field
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;
  console.log(errorMessage);

  const connectedValidationId = event.target.getAttribute('aria-describedby');
  const connectedValidationEl = connectedValidationId
    ? document.getElementById(connectedValidationId)
    : null;

  if (connectedValidationEl && errorMessage && !isValid) {
    connectedValidationEl.innerText = errorMessage;
  } else {
    connectedValidationEl.innerText = '';
  }
});