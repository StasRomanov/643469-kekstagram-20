'use strict';

(function () {
  var effect = {
    container: document.querySelector('.effect-level__line'),
    line: document.querySelector('.effect-level__depth'),
    pin: document.querySelector('.effect-level__pin')
  };

  var onMainPinMove = function (evt) {
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var startCoords = {
        x: evt.clientX,
      };
      var onMouseMove = function (moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
        };
        startCoords = {
          x: moveEvt.clientX,
        };
        while (effect.pin.offsetLeft > effect.container.offsetWidth) {
          effect.pin.style.left = effect.container.offsetWidth + 'px';
        }
        while (effect.pin.offsetLeft < 0) {
          effect.pin.style.left = '0px';
        }

        effect.pin.style.left = (effect.pin.offsetLeft - shift.x) + 'px';
        effect.line.style.width = (effect.pin.offsetLeft - shift.x) + 'px';
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  effect.pin.addEventListener('mousedown', onMainPinMove, false);
})();

