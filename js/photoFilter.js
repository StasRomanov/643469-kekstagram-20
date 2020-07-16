'use strict';

(function () {
  var filterBlock = document.querySelector('.img-filters');
  var filters = filterBlock.querySelectorAll('.img-filters__button');
  var randomFilter = filterBlock.querySelector('#filter-random');
  var defaultFilter = filterBlock.querySelector('#filter-default');
  var discussedFilter = filterBlock.querySelector('#filter-discussed');
  var FilterDebouncePauseMS = 500;

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

  var showFilter = function () {
    filterBlock.classList.remove('img-filters--inactive');
    defaultFilter.addEventListener('click', onDefaultFilterOn, false);
    randomFilter.addEventListener('click', onRandomFilterClick, false);
    discussedFilter.addEventListener('click', onDiscussedFilterClick, false);
  };

  var onRandomFilterClick = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filters.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      randomFilter.classList.add('img-filters__button--active');
      var filterPhotoData = window.data.photos.slice();
      filterPhotoData = shuffle(filterPhotoData).slice(0, 10);
      window.createPhoto(filterPhotoData);
    }
  }, FilterDebouncePauseMS);

  var onDefaultFilterOn = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filters.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      defaultFilter.classList.add('img-filters__button--active');
      window.createPhoto(window.data.photos);
    }
  }, FilterDebouncePauseMS);

  var onDiscussedFilterClick = window.debounce(function (evt) {
    if (evt.button === window.data.LEFT_MOUSE_CODE) {
      filters.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      discussedFilter.classList.add('img-filters__button--active');
      var filterPhotoData = window.data.photos.slice();
      filterPhotoData.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.createPhoto(filterPhotoData);
    }
  }, FilterDebouncePauseMS);

  window.setupFilter = function () {
    showFilter();
  };
})();
