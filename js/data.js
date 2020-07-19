'use strict';

(function () {
  var LEFT_MOUSE_CODE = 0;
  var ENTER_KEY_CODE = 'Enter';
  var ESC_KEY_CODE = 'Escape';
  var photos = [];
  var currentFilterEffect = null;
  var formBlock = document.querySelector('.img-upload__form');

  window.data = {
    photos: photos,
    LEFT_MOUSE_CODE: LEFT_MOUSE_CODE,
    ENTER_KEY_CODE: ENTER_KEY_CODE,
    ESC_KEY_CODE: ESC_KEY_CODE,
    formBlock: formBlock,
    currentFilterEffect: currentFilterEffect
  };
})();
