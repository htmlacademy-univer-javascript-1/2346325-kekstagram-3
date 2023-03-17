function generateRandomNumber(min, max) {
    if (min > max) {
        throw new Error('Min value cant be more max value');
    }
    return Math.round(Math.random() * (max - min) + min);
}

function isLengthCorrect(str, maxLength) {
    return str.length <= maxLength;
}

function generateData() {
    const photos = new Array();
    for (let i = 1; i <= 25; i++) {
        const photo = {
            id: i,
            url: `photos/${i}.jpg`,
            description: `Photo number ${i}`,
            likes: generateRandomNumber(15, 200),
            comments: generateRandomNumber(0, 200),
        }

        photos.push(photo);
    }
    return photos;
}

generateData();
isLengthCorrect("aaa", 5);
