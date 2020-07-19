'use strict';

(function () {
  var template = {
    success: document.querySelector('#success'),
    error: document.querySelector('#error')
  };
  var mainBlock = document.querySelector('main');

  var removePopup = function (message, button) {
    if (message) {
      if (message.classList.contains('error')) {
        button.removeEventListener('click', onErrorButtonClick, false);
        document.removeEventListener('keydown', onErrorButtonKeydown, false);
      }
      if (message.classList.contains('success')) {
        button.removeEventListener('click', onSuccessButtonClick, false);
        document.removeEventListener('keydown', onSuccessButtonKeydown, false);
      }
      document.removeEventListener('keydown', onDocumentKeydown, false);
      message.remove();
    }
  };

  var onSuccessButtonClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      removePopup(document.querySelector('.success'), document.querySelector('.success__button'));
    }
  };

  var onSuccessButtonKeydown = function (evt) {
    if (evt.code === window.data.ENTER_KEY_CODE) {
      removePopup(document.querySelector('.success'), document.querySelector('.success__button'));
    }
  };

  var onErrorButtonClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      removePopup(document.querySelector('.error'), document.querySelector('.error__button'));
    }
  };

  var onErrorButtonKeydown = function (evt) {
    if (evt.code === window.data.ENTER_KEY_CODE) {
      removePopup(document.querySelector('.error'), document.querySelector('.error__button'));
    }
  };

  var onDocumentKeydown = function (evt) {
    if (evt.code === window.data.ESC_KEY_CODE) {
      if (document.querySelector('.error')) {
        removePopup(document.querySelector('.error'), document.querySelector('.error__button'));
      }
      if (document.querySelector('.success')) {
        removePopup(document.querySelector('.success'), document.querySelector('.success__button'));
      }
    }
  };

  window.showSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successBlock = template.success.cloneNode(true).content;
    var successButton = successBlock.querySelector('.success__button');
    successButton.addEventListener('click', onSuccessButtonClick, false);
    successButton.addEventListener('keydown', onSuccessButtonKeydown, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
    fragment.appendChild(successBlock);
    mainBlock.appendChild(fragment);
  };

  window.showErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    var errorBlock = template.error.cloneNode(true).content;
    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick, false);
    errorButton.addEventListener('keydown', onErrorButtonKeydown, false);
    document.addEventListener('keydown', onDocumentKeydown, false);
    fragment.appendChild(errorBlock);
    mainBlock.appendChild(fragment);
  };
})();
