'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var STATUS_CODE_OK = 200;
  var JSON_TYPE = 'json';
  var dataLink = {
    load: 'https://javascript.pages.academy/kekstagram/data',
    send: 'https://javascript.pages.academy/kekstagram'
  };

  var dataTransfer = function (url, onSuccess, onError, method, send) {
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
      window.data.photos.forEach(function (item, index) {
        item.dataId = index;
      });
    }
    window.createPhoto(window.data.photos);
    window.showFilter();
  };

  var onErrorLoad = function () {
  };

  var onSuccessSend = function () {
    window.uploadPhotoClose();
    window.serverInfo.showSuccessMessage();
  };

  var onErrorSend = function () {
    window.uploadPhotoClose();
    window.serverInfo.showErrorMessage();
  };

  window.backend = {
    load: function () {
      dataTransfer(dataLink.load, onSuccessLoad, onErrorLoad, 'GET', '');
    },

    send: function () {
      dataTransfer(dataLink.send, onSuccessSend, onErrorSend, 'POST', new FormData(window.data.formBlock));
    }
  };
})();
