const SERVER_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

function getData(onSuccess) {
  return fetch(`${SERVER_URL}/data`)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
}

function postData(body, onSuccess, onFail, onFinal = () => {}) {
  return fetch(
    SERVER_URL,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .finally(() => onFinal());
}

export {getData, postData};
