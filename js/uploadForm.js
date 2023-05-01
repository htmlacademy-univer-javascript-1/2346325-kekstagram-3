import { postData } from './network.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const closeButton = document.querySelector('.img-upload__cancel');
const form = document.getElementById('upload-select-image');
const submitButton = document.getElementById('upload-submit');

const successMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('.error');


function escKeyHandler(evt) {
  if (evt.key === 'Escape') {
    form.reset();
    closeImgUpload();
  }
}

function closeImgUpload() {
  imgUploadForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escKeyHandler);
}

function openImgUpload() {
  imgUploadForm.classList.toggle('hidden');
  document.body.classList.toggle('modal-open');
  document.addEventListener('keydown', escKeyHandler);
}

fileInput.addEventListener('change', openImgUpload);
closeButton.addEventListener('click', closeImgUpload);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper__item--invalid',
  successClass: 'img-upload__field-wrapper__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
});

function createSuccessMessage() {
  closeImgUpload();
  form.reset();
  const successMessage = successMessageTemplate.cloneNode(true);
  body.appendChild(successMessage);
  const successButton = successMessage.querySelector('.success__button');

  function closeMessage(){
    successMessage.remove();
    document.removeEventListener('keydown', handleKeyDownEvent);
  }

  function handleKeyDownEvent(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  successButton.addEventListener('click', () => {
    closeMessage();
  });
  successMessage.addEventListener('click', (evt) => {
    if (evt.target.matches('.success')) {
      closeMessage();
    }
  });
  document.addEventListener('keydown', handleKeyDownEvent);
}

function createErrorMessage() {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  body.appendChild(errorMessage);
  const errorButton = errorMessage.querySelector('.error__button');

  function closeMessage(){
    errorMessage.remove();
    document.removeEventListener('keydown', handleKeyDownEvent);
  }

  function handleKeyDownEvent(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  errorButton.addEventListener('click', () => {
    closeMessage();
  });
  errorMessage.addEventListener('click', (evt) => {
    if (evt.target.matches('.error')) {
      closeMessage();
    }
  });
  document.addEventListener('keydown', handleKeyDownEvent);
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    submitButton.setAttribute('disabled', '');

    postData(
      new FormData(evt.target),
      createSuccessMessage,
      createErrorMessage,
      () => {
        closeImgUpload();
        submitButton.removeAttribute('disabled', '');
      }
    );
  }
});

export {createErrorMessage};
