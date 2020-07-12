'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture');
  var photoBlock = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureComments = bigPicture.querySelector('.comments-count');
  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
  var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');


  var createBigPhoto = function () {
    var fragment = document.createDocumentFragment();
    bigPictureImage.src = window.data.photos[0].url;
    bigPictureLikes.textContent = window.data.photos[0].likes;
    bigPictureDescription.textContent = window.data.photos[0].description;
    bigPictureComments.textContent = window.data.photos[0].comments.length;
    window.data.photos[0].comments.forEach(function (item) {
      var bigPictureCommentsItem = bigPictureCommentsList.querySelector('.social__comment').cloneNode(true);
      var bigPictureCommentsAvatar = bigPictureCommentsItem.querySelector('.social__picture');
      var bigPictureCommentsText = bigPictureCommentsItem.querySelector('.social__text');
      bigPictureCommentsAvatar.src = item.avatar;
      bigPictureCommentsAvatar.setAttribute('alt', item.name);
      bigPictureCommentsText.textContent = item.message;
      fragment.appendChild(bigPictureCommentsItem);
    });
    bigPictureCommentsList.innerHTML = '';
    bigPictureCommentsList.appendChild(fragment);
    bigPictureCommentsCount.classList.add('hidden');
    bigPictureCommentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  };

  var createPhoto = function () {
    var fragment = document.createDocumentFragment();
    window.data.photos.forEach(function (item, index) {
      if (index > 0) {
        var pictureTemplateClone = pictureTemplate.cloneNode(true).content;
        var pictureAddress = pictureTemplateClone.querySelector('.picture img');
        var pictureLikes = pictureTemplateClone.querySelector('.picture__likes');
        var pictureComments = pictureTemplateClone.querySelector('.picture__comments');
        pictureAddress.src = item.url;
        pictureLikes.textContent = item.likes;
        pictureComments.textContent = item.comments.length;
        fragment.appendChild(pictureTemplateClone);
      }
    });
    photoBlock.appendChild(fragment);
  };

  window.showPhoto = function () {
    createPhoto();
    createBigPhoto();
  };
})();
