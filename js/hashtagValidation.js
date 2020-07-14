'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');

  var unique = function (array) {
    var result = [];
    array.forEach(function (item) {
      var currentItem = item.toLowerCase();
      if (!result.includes(currentItem)) {
        result.push(item);
      }
    });
    return result;
  };

  var onImgUploadButtonSubmit = function (evt) {
    evt.preventDefault();
    var validHashtag = String(hashtagInput.value.match(/#[0-9A-Za-zА-Яа-яё]+/g));
    validHashtag = validHashtag.replace(/,/gi, ' ');
    validHashtag = validHashtag.split(' ');
    validHashtag = validHashtag.filter(function (item) {
      return item.length <= 20;
    });
    validHashtag = unique(validHashtag);
    validHashtag = validHashtag.slice(5);
    hashtagInput.value = String(validHashtag).replace(/,/gi, ' ');
    window.uploadPhotoClose();
    window.backend.send();
  };

  window.data.formBlock.addEventListener('submit', onImgUploadButtonSubmit, false);
})();
