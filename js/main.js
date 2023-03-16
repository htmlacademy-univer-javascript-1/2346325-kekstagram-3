function generateRandomNumber(min, max) {
    if (min > max) {
        throw new Error("Min value can't be more max value");
    }
    return Math.round(Math.random() * (max - min) + min);
}

function isLengthCorrect(str, maxLength) {
    return str.length <= maxLength;
}
