'use strict';

(function () {
  var effect = {
    container: document.querySelector('.effect-level__line'),
    line: document.querySelector('.effect-level__depth'),
    pin: document.querySelector('.effect-level__pin'),
    input: document.querySelector('.effect-level__value')
  };

  var onMainPinMove = function (evt) {
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mouseup', onMouseUp);
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var startCoords = {
        x: evt.clientX,
      };
      console.log(effect.container.offsetWidth);
      var onMouseMove = function (moveEvt) {
        if (evt.button === window.data.LEFT_MOUSE_CODE) {
          effect.input.classList.add('visually-hidden');
          var shift = {
            x: startCoords.x - moveEvt.clientX,
          };
          startCoords = {
            x: moveEvt.clientX,
          };
          if (effect.pin.offsetLeft > effect.container.offsetWidth) {
            effect.pin.style.left = effect.container.offsetWidth + 'px';
          } else if (effect.pin.offsetLeft <= 0) {
            effect.pin.style.left = '1px';
            console.log(effect.pin.offsetLeft);
          } else {
            effect.pin.style.left = (effect.pin.offsetLeft - shift.x) + 'px';
            effect.line.style.width = (effect.pin.offsetLeft - shift.x) + 'px';
            if (effect.input.value !== 0) {
              effect.input.value = Math.round(effect.pin.offsetLeft / effect.container.offsetWidth * 100);
            }
            console.log(effect.input.value);
          }
        }
      };
      document.addEventListener('mousemove', onMouseMove);
    }
  };

  effect.pin.addEventListener('mousedown', onMainPinMove, false);
})();

