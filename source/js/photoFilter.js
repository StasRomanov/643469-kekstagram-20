'use strict';

(function () {
  var FILTER_PAUSE_MS = 500;
  var filterBlock = document.querySelector('.img-filters');
  var filter = {
    list: filterBlock.querySelectorAll('.img-filters__button'),
    random: filterBlock.querySelector('#filter-random'),
    default: filterBlock.querySelector('#filter-default'),
    discussed: filterBlock.querySelector('#filter-discussed'),
  };

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var onRandomFilterClick = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filter.list.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      filter.random.classList.add('img-filters__button--active');
      var filterPhotoData = window.data.photos.slice();
      filterPhotoData = shuffle(filterPhotoData).slice(0, 10);
      window.createPhoto(filterPhotoData);
    }
  }, FILTER_PAUSE_MS);

  var onDefaultFilterOn = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filter.list.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      filter.default.classList.add('img-filters__button--active');
      window.createPhoto(window.data.photos);
    }
  }, FILTER_PAUSE_MS);

  var onDiscussedFilterClick = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filter.list.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      filter.discussed.classList.add('img-filters__button--active');
      var filterPhotoData = window.data.photos.slice();
      filterPhotoData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.createPhoto(filterPhotoData);
    }
  }, FILTER_PAUSE_MS);

  window.showFilter = function () {
    filterBlock.classList.remove('img-filters--inactive');
    filter.default.addEventListener('click', onDefaultFilterOn, false);
    filter.random.addEventListener('click', onRandomFilterClick, false);
    filter.discussed.addEventListener('click', onDiscussedFilterClick, false);
  };
})();
