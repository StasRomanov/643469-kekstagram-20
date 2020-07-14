'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');

  var unique = function (arr) {
    var result = [];
    for (var str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  }

  var onImgUploadButtonSubmit = function (evt) {
    evt.preventDefault();
    var validHashtag = String(hashtagInput.value.match(/#[0-9A-Za-zА-Яа-яё]+/g));
    validHashtag = validHashtag.replace(/,/gi, ' ');
    validHashtag = validHashtag.split(' ');
    validHashtag = validHashtag.filter(function (item) {
      return item.length <= 20;
    });
    validHashtag = unique(validHashtag);
    hashtagInput.value = String(validHashtag).replace(/,/gi, ' ');
    console.log(hashtagInput.value);
    window.uploadPhotoClose();
    window.backend.send();
  };

  window.data.formBlock.addEventListener('submit', onImgUploadButtonSubmit, false);
})();
