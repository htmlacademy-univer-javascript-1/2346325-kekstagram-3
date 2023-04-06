const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const scaleMinusButton = document.querySelector('.scale__control--smaller');

let scaleValueInt = parseInt(scaleValue.getAttribute('value'), 10);
const minScale = 25;
const maxScale = 100;
const step = 25;

function zoomOut() {
  if (scaleValueInt >= minScale + step) {
    scaleValueInt -= 25;
    scaleValue.setAttribute('value', `${scaleValueInt}%`);
    imgPreview.style.transform = `scale(${scaleValueInt / 100})`;
  }
}

function zoomIn() {
  if (scaleValueInt <= maxScale - step) {
    scaleValueInt += 25;
    scaleValue.setAttribute('value', `${scaleValueInt}%`);
    imgPreview.style.transform = `scale(${scaleValueInt / 100})`;
  }
}

scalePlusButton.addEventListener('click', zoomIn);
scaleMinusButton.addEventListener('click', zoomOut);
