'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatar = {
    input: document.querySelector('#upload-file'),
    picture: document.querySelector('.img-upload__preview img'),
    pictureDefault: './img/upload-default-image.jpg'
  };

  var onAvatarChange = function () {
    var file = avatar.input.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatar.picture.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  avatar.input.addEventListener('change', onAvatarChange, false);
})();
