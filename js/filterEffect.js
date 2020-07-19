'use strict';

(function () {
  var effect = {
    container: document.querySelector('.effect-level__line'),
    line: document.querySelector('.effect-level__depth'),
    pin: document.querySelector('.effect-level__pin'),
    input: document.querySelector('.effect-level__value'),
    photo: document.querySelector('.img-upload__preview img')
  };

  var onEffectPinMove = function (evt) {
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var startCoords = {
        x: evt.clientX,
      };
      var onMouseMove = function (moveEvt) {
        effect.input.classList.add('visually-hidden');
        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };
        startCoords = {
          x: moveEvt.clientX,
        };
        effect.pin.style.left = (effect.pin.offsetLeft - shift.x) + 'px';
        effect.line.style.width = (effect.pin.offsetLeft - shift.x) + 'px';
        if (effect.pin.offsetLeft - shift.x > effect.container.offsetWidth) {
          effect.pin.style.left = effect.container.offsetWidth + 'px';
        }
        if (effect.pin.offsetLeft - shift.x <= 0) {
          effect.pin.style.left = '1px';
        }
        if (effect.input.value !== 0) {
          effect.input.value = Math.round(effect.pin.offsetLeft / effect.container.offsetWidth * 100);
        }
        if (effect.input.value > 100) {
          effect.input.value = 100;
        }
        if (effect.input.value <= 0) {
          effect.input.value = 1;
        }
        switch (window.data.currentFilterEffect) {
          case ('chrome'):
            effect.photo.style.filter = 'grayscale(' + effect.input.value / 100 + ')';
            break;
          case ('sepia'):
            effect.photo.style.filter = 'sepia(' + effect.input.value / 100 + ')';
            break;
          case ('marvin'):
            effect.photo.style.filter = 'invert(' + effect.input.value + '%)';
            break;
          case ('phobos'):
            effect.photo.style.filter = 'blur(' + effect.input.value / (100 / 3) + 'px)';
            break;
          case ('heat'):
            effect.photo.style.filter = 'brightness(' + effect.input.value / (100 / 3) + ')';
            break;
        }
      };
      document.addEventListener('mousemove', onMouseMove);
    }
  };

  effect.pin.addEventListener('mousedown', onEffectPinMove, false);

  window.filterEffect = {
    line: effect.line,
    pin: effect.pin
  };
})();

