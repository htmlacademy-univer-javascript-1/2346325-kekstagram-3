import {generateRandomNumber} from './utils.js';

function generateData() {
  const photos = new Array();

  for (let i = 1; i <= 25; i++) {
    photos.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: `Photo number ${i}`,
      likes: generateRandomNumber(15, 200),
      comments: generateRandomNumber(0, 200),
    });
  }

  return photos;
}

export {generateData};
