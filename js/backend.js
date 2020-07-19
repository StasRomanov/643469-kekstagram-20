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
      window.data.photos.forEach(function (item, index) {
        item.dataId = index;
      });
    }
    console.log(window.data.photos);
    window.showPhoto();
    window.setupFilter();
  };

  var onErrorLoad = function () {
    console.log('error load');
  };

  var onSuccessSend = function () {
    console.log('Success send');
    window.uploadPhotoClose();
  };

  var onErrorSend = function () {
    console.log('error send');
  };

  window.backend = {
    load: function () {
      serverData(DATA_LINK_LOAD, onSuccessLoad, onErrorLoad, 'GET', '');
    },

    send: function () {
      serverData(DATA_LINK_SEND, onSuccessSend, onErrorSend, 'POST', new FormData(window.data.formBlock));
    }
  };
})();
