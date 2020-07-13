'use strict';

(function () {
  var uploadPhotoContainer = document.querySelector('.img-upload__overlay');
  var uploadPhotoImage = document.querySelector('.img-upload__preview img');
  var uploadPhotoInput = document.querySelector('#upload-file');
  var uploadPhotoCancel = document.querySelector('#upload-cancel');
  var effectList = document.querySelector('.effects__list');
  var uploadPhotoLevel = document.querySelector('.img-upload__effect-level');
  var scaleContainer = document.querySelector('.img-upload__scale');
  var scaleValue = document.querySelector('.scale__control--value');

  var onEffectListChange = function (evt) {
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

  var onScaleContainerClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var target = evt.target;
      if (target.classList.contains('scale__control--bigger') && Number(scaleValue.value.replace('%', '')) < 100) {
        scaleValue.value = Number(scaleValue.value.replace('%', '')) + 25 + '%';
        uploadPhotoImage.style.transform = 'scale(' + Number(scaleValue.value.replace('%', '')) / 100 + ')';
      }
      if (target.classList.contains('scale__control--smaller') && Number(scaleValue.value.replace('%', '')) > 25) {
        scaleValue.value = Number(scaleValue.value.replace('%', '')) - 25 + '%';
        uploadPhotoImage.style.transform = 'scale(' + Number(scaleValue.value.replace('%', '')) / 100 + ')';
      }
    }
  };

  uploadPhotoInput.addEventListener('change', function () {
    uploadPhotoImage.style.transform = 'scale(1)';
    scaleValue.value = '100%';
    uploadPhotoContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPhotoLevel.classList.add('hidden');
    effectList.addEventListener('click', onEffectListChange, false);
  });

  uploadPhotoCancel.addEventListener('click', function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      uploadPhotoInput.value = '';
      scaleValue.value = '100%';
      uploadPhotoImage.className = '';
      uploadPhotoImage.style.transform = 'scale(1)';
      uploadPhotoContainer.classList.add('hidden');
      document.body.classList.remove('modal-open');
      effectList.removeEventListener('click', onEffectListChange, false);
    }
  });

  scaleContainer.addEventListener('click', onScaleContainerClick, false);
})();
