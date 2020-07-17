'use strict';

(function () {
  var photos = [];
  var LEFT_MOUSE_CODE = 0;
  var formBlock = document.querySelector('.img-upload__form');
  var currentFilterEffect = null;

  window.data = {
    photos: photos,
    LEFT_MOUSE_CODE: LEFT_MOUSE_CODE,
    formBlock: formBlock,
    currentFilterEffect: currentFilterEffect
  };
})();
