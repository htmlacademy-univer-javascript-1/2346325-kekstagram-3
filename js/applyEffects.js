const imgPreview = document.querySelector('.img-upload__preview');
let effect = 'none';
const radios = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const form = document.getElementById('upload-select-image');

radios.forEach((radio) => {
  radio.addEventListener('input', () => {
    updateEffect(radio);
  });
});

function setSlider() {
  // if there is no effect hide slider and delete styles
  if (effect === 'none') {
    sliderElement.classList.add('hidden');
    imgPreview.style.removeProperty('filter');
  } else {
    sliderElement.classList.remove('hidden');
  }

  // set slider options depending on  effect
  if (effect === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1
    });
  } else if (effect === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else if (effect === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1
    });
  } else {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1
    });
  }
}

function updateEffect(radio) {
  effect = radio.value;
  setSlider();
}

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
  const value = valueElement.value;
  if (effect === 'chrome') {
    imgPreview.style.filter = `grayscale(${value})`;
  } else if (effect === 'sepia') {
    imgPreview.style.filter = `sepia(${value})`;
  } else if (effect === 'marvin') {
    imgPreview.style.filter = `invert(${value}%)`;
  } else if (effect === 'phobos') {
    imgPreview.style.filter = `blur(${value}px)`;
  } else if (effect === 'heat') {
    imgPreview.style.filter = `brightness(${value})`;
  }
});

function resetImage() {
  sliderElement.classList.add('hidden');
  imgPreview.removeAttribute('style');
  effect = 'none';
}

form.addEventListener('reset', resetImage);
