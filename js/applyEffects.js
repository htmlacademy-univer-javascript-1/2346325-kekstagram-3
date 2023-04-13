const imgPreview = document.querySelector('.img-upload__preview');
let currentEffect = 'none';
const radios = document.querySelectorAll('.effects__radio');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const form = document.getElementById('upload-select-image');

const effects  = [
  {
    name: 'chrome',
    cssEffect: 'grayscale',
    rangeMin: 0,
    rangeMax: 1,
    step: 0.1,
    postfix: ''
  },
  {
    name: 'sepia',
    cssEffect: 'sepia',
    rangeMin: 0,
    rangeMax: 1,
    step: 0.1,
    postfix: ''
  },
  {
    name: 'marvin',
    cssEffect: 'invert',
    rangeMin: 0,
    rangeMax: 100,
    step: 1,
    postfix: '%'
  },
  {
    name: 'phobos',
    cssEffect: 'blur',
    rangeMin: 0,
    rangeMax: 3,
    step: 0.1,
    postfix: 'px'
  },
  {
    name: 'heat',
    cssEffect: 'brightness',
    rangeMin: 1,
    rangeMax: 3,
    step: 0.1,
    postfix: ''
  },
];

radios.forEach((radio) => {
  radio.addEventListener('input', () => {
    updateEffect(radio);
  });
});

function setSlider() {
  // if there is no effect hide slider and delete styles
  if (currentEffect === 'none') {
    sliderElement.classList.add('hidden');
    imgPreview.style.removeProperty('filter');
  } else {
    sliderElement.classList.remove('hidden');

    // set slider options depending on  effect
    effects.map((effect) => {
      if (effect.name === currentEffect) {
        sliderElement.noUiSlider.updateOptions({
          range: {
            min: effect.rangeMin,
            max: effect.rangeMax,
          },
          start: effect.rangeMax,
          step: effect.step,
        });
      }
    });
  }
}

function updateEffect(radio) {
  currentEffect = radio.value;
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

  effects.map((effect) => {
    if (currentEffect === effect.name) {
      imgPreview.style.filter = `${effect.cssEffect}(${value}${effect.postfix})`;
    }
  });
});

function resetImage() {
  sliderElement.classList.add('hidden');
  imgPreview.removeAttribute('style');
  currentEffect = 'none';
}

form.addEventListener('reset', resetImage);
