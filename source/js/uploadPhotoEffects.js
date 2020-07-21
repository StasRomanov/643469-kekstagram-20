'use strict';

(function () {
  var uploadPhoto = {
    block: document.querySelector('.img-upload__overlay'),
    image: document.querySelector('.img-upload__preview img'),
    input: document.querySelector('#upload-file'),
    close: document.querySelector('#upload-cancel'),
    effect: {
      list: document.querySelector('.effects__list'),
      level: document.querySelector('.img-upload__effect-level'),
    },
    scale: {
      block: document.querySelector('.img-upload__scale'),
      value: document.querySelector('.scale__control--value')
    }
  };

  var onEffectListChange = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var target = evt.target;
      if (target.tagName === 'INPUT' && target.id !== 'effect-none') {
        uploadPhoto.effect.level.classList.remove('hidden');
        uploadPhoto.image.className = target.id.replace('-', 's__preview--');
      }
      if (target.id === 'effect-none') {
        uploadPhoto.image.className = '';
        uploadPhoto.effect.level.classList.add('hidden');
      }
      window.filterEffect.line.style.width = '100%';
      window.filterEffect.pin.style.left = '100%';
      uploadPhoto.image.style = '';
      uploadPhoto.image.style.transform = 'scale(' + Number(uploadPhoto.scale.value.value.replace('%', '')) / 100 + ')';
      window.data.currentFilterEffect = String(uploadPhoto.image.className).replace('effects__preview--', '');
    }
  };

  var onScaleContainerClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var target = evt.target;
      if (target.classList.contains('scale__control--bigger') && Number(uploadPhoto.scale.value.value.replace('%', '')) < 100) {
        uploadPhoto.scale.value.value = Number(uploadPhoto.scale.value.value.replace('%', '')) + 25 + '%';
        uploadPhoto.image.style.transform = 'scale(' + Number(uploadPhoto.scale.value.value.replace('%', '')) / 100 + ')';
      }
      if (target.classList.contains('scale__control--smaller') && Number(uploadPhoto.scale.value.value.replace('%', '')) > 25) {
        uploadPhoto.scale.value.value = Number(uploadPhoto.scale.value.value.replace('%', '')) - 25 + '%';
        uploadPhoto.image.style.transform = 'scale(' + Number(uploadPhoto.scale.value.value.replace('%', '')) / 100 + ')';
      }
    }
  };

  var onUploadPhotoCancelClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      window.uploadPhotoClose();
      uploadPhoto.input.addEventListener('change', onUploadPhotoInputChange, false);
      uploadPhoto.effect.list.removeEventListener('click', onEffectListChange, false);
      uploadPhoto.close.removeEventListener('click', onUploadPhotoCancelClick, false);
      uploadPhoto.scale.block.removeEventListener('click', onScaleContainerClick, false);
    }
  };

  var onUploadPhotoInputChange = function () {
    uploadPhoto.image.style.transform = 'scale(1)';
    uploadPhoto.scale.value.value = '100%';
    uploadPhoto.block.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPhoto.effect.level.classList.add('hidden');
    uploadPhoto.effect.list.addEventListener('click', onEffectListChange, false);
    uploadPhoto.input.removeEventListener('change', onUploadPhotoInputChange, false);
    uploadPhoto.close.addEventListener('click', onUploadPhotoCancelClick, false);
    uploadPhoto.scale.block.addEventListener('click', onScaleContainerClick, false);
  };

  uploadPhoto.input.addEventListener('change', onUploadPhotoInputChange, false);

  window.uploadPhotoClose = function () {
    uploadPhoto.input.value = '';
    uploadPhoto.scale.value.value = '100%';
    uploadPhoto.image.className = '';
    uploadPhoto.image.style.transform = 'scale(1)';
    uploadPhoto.image.style.filter = '';
    uploadPhoto.block.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadPhoto.effect.list.removeEventListener('click', onEffectListChange, false);
    uploadPhoto.input.addEventListener('change', onUploadPhotoInputChange, false);
  };
})();
