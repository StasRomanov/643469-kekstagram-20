'use strict';

(function () {
  var commentCount = 0;
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
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureCommentsInput = document.querySelector('.social__footer-text');

  var onPhotoBlockClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var target = evt.target;
      openPhoto(target);
    }
  };

  var onPhotoBlockKeydown = function (evt) {
    if (evt.code === window.data.ENTER_KEY_CODE && evt.target.tagName === 'A') {
      var target = evt.target.querySelector('img');
      openPhoto(target);
    }
  };

  var onBigPictureCancelClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      evt.preventDefault();
      closePhoto();
    }
  };

  var onBigPictureCancelKeydown = function (evt) {
    if (evt.code === window.data.ESC_KEY_CODE && document.activeElement !== bigPictureCommentsInput) {
      evt.preventDefault();
      closePhoto();
    }
  };

  var closePhoto = function () {
    commentCount = 0;
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCancel.removeEventListener('click', onBigPictureCancelClick, false);
    document.removeEventListener('keydown', onBigPictureCancelKeydown, false);
    photoBlock.addEventListener('click', onPhotoBlockClick, false);
    photoBlock.addEventListener('keydown', onPhotoBlockKeydown, false);
  };

  var openPhoto = function (target) {
    if (target.classList.contains('picture__img')) {
      var pictureCurrentId = target.getAttribute('data-id');
      createBigPhoto(pictureCurrentId);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick, false);
      document.addEventListener('keydown', onBigPictureCancelKeydown, false);
      photoBlock.removeEventListener('click', onPhotoBlockClick, false);
      photoBlock.removeEventListener('keydown', onPhotoBlockKeydown, false);
    }
  };

  var onBigPictureCommentsLoaderClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var pictureId = bigPictureImage.getAttribute('data-id');
      var fragment = document.createDocumentFragment();
      commentCount += 5;
      fragment.appendChild(renderComments(pictureId));
      bigPictureCommentsList.appendChild(fragment);
    }
  };

  var renderComments = function (index) {
    var fragment = document.createDocumentFragment();
    for (var i = commentCount; i < commentCount + 5 && i < window.data.photos[index].comments.length; i++) {
      var bigPictureCommentsItem = bigPictureCommentsList.querySelector('.social__comment').cloneNode(true);
      var bigPictureCommentsAvatar = bigPictureCommentsItem.querySelector('.social__picture');
      var bigPictureCommentsText = bigPictureCommentsItem.querySelector('.social__text');
      bigPictureCommentsAvatar.src = window.data.photos[index].comments[i].avatar;
      bigPictureCommentsAvatar.setAttribute('alt', window.data.photos[index].comments[i].name);
      bigPictureCommentsText.textContent = window.data.photos[index].comments[i].message;
      if (i === window.data.photos[index].comments.length - 1) {
        bigPictureCommentsCount.textContent = window.data.photos[index].comments.length + ' из '
          + window.data.photos[index].comments.length + ' комментариев';
      } else {
        bigPictureCommentsCount.textContent = (i + 1) + ' из ' + window.data.photos[index].comments.length + ' комментариев';
      }
      fragment.appendChild(bigPictureCommentsItem);
    }
    return fragment;
  };

  var createBigPhoto = function (photoIndex) {
    var fragment = document.createDocumentFragment();
    bigPictureImage.src = window.data.photos[photoIndex].url;
    bigPictureImage.setAttribute('data-id', photoIndex);
    bigPictureLikes.textContent = window.data.photos[photoIndex].likes;
    bigPictureDescription.textContent = window.data.photos[photoIndex].description;
    bigPictureComments.textContent = window.data.photos[photoIndex].comments.length;
    fragment.appendChild(renderComments(photoIndex));
    bigPictureCommentsList.innerHTML = '';
    bigPictureCommentsList.appendChild(fragment);
    document.body.classList.add('modal-open');
    bigPicture.classList.remove('hidden');
  };

  window.createPhoto = function (photo) {
    var fragment = document.createDocumentFragment();
    if (document.querySelectorAll('.picture')) {
      var photos = document.querySelectorAll('.picture');
      photos.forEach(function (item) {
        item.remove();
      });
    }
    photo.forEach(function (item) {
      var pictureTemplateClone = pictureTemplate.cloneNode(true).content;
      var pictureAddress = pictureTemplateClone.querySelector('.picture img');
      var pictureLikes = pictureTemplateClone.querySelector('.picture__likes');
      var pictureComments = pictureTemplateClone.querySelector('.picture__comments');
      pictureAddress.src = item.url;
      pictureAddress.setAttribute('data-id', item.dataId);
      pictureLikes.textContent = item.likes;
      pictureComments.textContent = item.comments.length;
      fragment.appendChild(pictureTemplateClone);
    });
    photoBlock.appendChild(fragment);
  };

  photoBlock.addEventListener('click', onPhotoBlockClick, false);
  photoBlock.addEventListener('keydown', onPhotoBlockKeydown, false);
  bigPictureCommentsLoader.addEventListener('click', onBigPictureCommentsLoaderClick, false);

  window.showPhoto = function () {
    window.createPhoto(window.data.photos);
  };
})();
