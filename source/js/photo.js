'use strict';

(function () {
  var COMMENT_COUNT_STEP = 5;
  var commentCount = 0;
  var pictureTemplate = document.querySelector('#picture');
  var photoBlock = document.querySelector('.pictures');
  var bigPictureBlock = document.querySelector('.big-picture');
  var bigPicture = {
    image: bigPictureBlock.querySelector('.big-picture__img img'),
    likes: bigPictureBlock.querySelector('.likes-count'),
    comments: {
      block: bigPictureBlock.querySelector('.comments-count'),
      count: bigPictureBlock.querySelector('.social__comment-count'),
      loader: bigPictureBlock.querySelector('.comments-loader'),
      list: bigPictureBlock.querySelector('.social__comments'),
      input: document.querySelector('.social__footer-text')
    },
    description: bigPictureBlock.querySelector('.social__caption'),
    close: bigPictureBlock.querySelector('.big-picture__cancel')
  };

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
    if (evt.code === window.data.ESC_KEY_CODE && document.activeElement !== bigPicture.comments.input) {
      evt.preventDefault();
      closePhoto();
    }
  };

  var closePhoto = function () {
    commentCount = 0;
    bigPictureBlock.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPicture.close.removeEventListener('click', onBigPictureCancelClick, false);
    document.removeEventListener('keydown', onBigPictureCancelKeydown, false);
    photoBlock.addEventListener('click', onPhotoBlockClick, false);
    photoBlock.addEventListener('keydown', onPhotoBlockKeydown, false);
  };

  var openPhoto = function (target) {
    if (target.classList.contains('picture__img')) {
      var pictureCurrentId = target.getAttribute('data-id');
      createBigPhoto(pictureCurrentId);
      bigPicture.close.addEventListener('click', onBigPictureCancelClick, false);
      document.addEventListener('keydown', onBigPictureCancelKeydown, false);
      photoBlock.removeEventListener('click', onPhotoBlockClick, false);
      photoBlock.removeEventListener('keydown', onPhotoBlockKeydown, false);
    }
  };

  var onBigPictureCommentsLoaderClick = function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      var pictureId = bigPicture.image.getAttribute('data-id');
      var fragment = document.createDocumentFragment();
      commentCount += COMMENT_COUNT_STEP;
      fragment.appendChild(renderComments(pictureId));
      bigPicture.comments.list.appendChild(fragment);
    }
  };

  var renderComments = function (index) {
    var fragment = document.createDocumentFragment();
    for (var i = commentCount; i < commentCount + COMMENT_COUNT_STEP && i < window.data.photos[index].comments.length; i++) {
      var bigPictureCommentsItem = bigPicture.comments.list.querySelector('.social__comment').cloneNode(true);
      var bigPictureCommentsAvatar = bigPictureCommentsItem.querySelector('.social__picture');
      var bigPictureCommentsText = bigPictureCommentsItem.querySelector('.social__text');
      bigPictureCommentsAvatar.src = window.data.photos[index].comments[i].avatar;
      bigPictureCommentsAvatar.setAttribute('alt', window.data.photos[index].comments[i].name);
      bigPictureCommentsText.textContent = window.data.photos[index].comments[i].message;
      if (i === window.data.photos[index].comments.length - 1) {
        bigPicture.comments.count.textContent = window.data.photos[index].comments.length + ' из '
          + window.data.photos[index].comments.length + ' комментариев';
        bigPicture.comments.loader.classList.add('hidden');
      } else {
        bigPicture.comments.count.textContent = (i + 1) + ' из ' + window.data.photos[index].comments.length + ' комментариев';
      }
      fragment.appendChild(bigPictureCommentsItem);
    }
    return fragment;
  };

  var createBigPhoto = function (photoIndex) {
    var fragment = document.createDocumentFragment();
    bigPicture.image.src = window.data.photos[photoIndex].url;
    bigPicture.image.setAttribute('data-id', photoIndex);
    bigPicture.likes.textContent = window.data.photos[photoIndex].likes;
    bigPicture.description.textContent = window.data.photos[photoIndex].description;
    bigPicture.comments.block.textContent = String(window.data.photos[photoIndex].comments.length);
    fragment.appendChild(renderComments(photoIndex));
    bigPicture.comments.list.innerHTML = '';
    bigPicture.comments.list.appendChild(fragment);
    document.body.classList.add('modal-open');
    bigPictureBlock.classList.remove('hidden');
    if (window.data.photos[photoIndex].comments.length > COMMENT_COUNT_STEP) {
      bigPicture.comments.loader.classList.remove('hidden');
    } else {
      bigPicture.comments.loader.classList.add('hidden');
    }
  };

  photoBlock.addEventListener('click', onPhotoBlockClick, false);
  photoBlock.addEventListener('keydown', onPhotoBlockKeydown, false);
  bigPicture.comments.loader.addEventListener('click', onBigPictureCommentsLoaderClick, false);

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
      pictureComments.textContent = String(item.comments.length);
      fragment.appendChild(pictureTemplateClone);
    });
    photoBlock.appendChild(fragment);
  };
})();
