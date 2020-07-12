'use strict';

(function () {
  var DATA_LINK_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var DATA_LINK_SEND = 'https://javascript.pages.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var JSON_TYPE = 'json';

  var serverData = function (url, onSuccess, onError, method, send) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = JSON_TYPE;
    xhr.open(method, url);
    xhr.send(send);
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
    xhr.addEventListener('error', function () {
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var onSuccessLoad = function (data) {
    if (window.data.photos.length === 0) {
      window.data.photos = data;
    }
    console.log(window.data.photos);
    window.showPhoto();
  };

  var onErrorLoad = function () {
  };

  var onSuccessSend = function () {
  };

  var onErrorSend = function () {
  };

  window.backend = {
    load: function () {
      serverData(DATA_LINK_LOAD, onSuccessLoad, onErrorLoad, 'GET', '');
    },

    send: function (evt) {
      evt.preventDefault();
      window.data.addressInput.removeAttribute('disabled');
      window.data.activeStatus = false;
      serverData(DATA_LINK_SEND, onSuccessSend, onErrorSend, 'POST', '');
    }
  };

  window.backend.load();
})();
