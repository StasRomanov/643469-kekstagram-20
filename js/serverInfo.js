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
        button.addEventListener('click', onSuccessButtonClick, false);
        document.addEventListener('keydown', onSuccessButtonKeydown, false);
      }
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

  window.showSuccessMessage = function () {
    var fragment = document.createDocumentFragment();
    var successBlock = template.success.cloneNode(true).content;
    var successButton = successBlock.querySelector('.success__button');
    successButton.addEventListener('click', onSuccessButtonClick, false);
    document.addEventListener('keydown', onSuccessButtonKeydown, false);
    fragment.appendChild(successBlock);
    mainBlock.appendChild(fragment);
  };

  window.showErrorMessage = function () {
    var fragment = document.createDocumentFragment();
    var errorBlock = template.error.cloneNode(true).content;
    var errorButton = errorBlock.querySelector('.error__button');
    errorButton.addEventListener('click', onErrorButtonClick, false);
    document.addEventListener('keydown', onErrorButtonKeydown, false);
    fragment.appendChild(errorBlock);
    mainBlock.appendChild(fragment);
  };
})();
