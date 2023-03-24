function generateRandomNumber(min, max) {
  if (min > max) {
    throw new Error('Min value cant be more max value');
  }
  return Math.round(Math.random() * (max - min) + min);
}

function isLengthCorrect(str, maxLength) {
  return str.length <= maxLength;
}

export {generateRandomNumber, isLengthCorrect};
