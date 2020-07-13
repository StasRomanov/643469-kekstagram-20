'use strict';

(function () {
  var uploadPhotoContainer = document.querySelector('.img-upload__overlay');
  var uploadPhotoImage = document.querySelector('.img-upload__preview img');
  var uploadPhotoInput = document.querySelector('#upload-file');
  var uploadPhotoCancel = document.querySelector('#upload-cancel');
  var effectList = document.querySelector('.effects__list');
  var uploadPhotoLevel = document.querySelector('.img-upload__effect-level');

  var setPhotoFilter = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var target = evt.target;
      if (target.tagName === 'INPUT' && target.id !== 'effect-none') {
        uploadPhotoLevel.classList.remove('hidden');
        uploadPhotoImage.className = target.id.replace('-', 's__preview--');
      }
      if (target.id === 'effect-none') {
        uploadPhotoImage.className = '';
        uploadPhotoLevel.classList.add('hidden');
      }
    }
  };

  uploadPhotoInput.addEventListener('change', function () {
    uploadPhotoContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPhotoLevel.classList.add('hidden');
    effectList.addEventListener('click', setPhotoFilter, false);
  });

  uploadPhotoCancel.addEventListener('click', function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      uploadPhotoInput.value = '';
      uploadPhotoImage.className = '';
      uploadPhotoContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
      effectList.removeEventListener('click', setPhotoFilter, false);
    }
  });
})();
