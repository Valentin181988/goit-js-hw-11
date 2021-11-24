import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './get-api';
import galleryPhotos from './renderGallery';
import scroll from './scroll';
import throttle from 'lodash.throttle';

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
const gallery = document.querySelector(".gallery");
/* const loadMorePhotos = document.querySelector(".load-more"); */
const throttled = throttle(getMorePhotos, 300);
let observer = null;

let currentPageNumber = 1;

btnSearch.disabled = true;

btnSearch.addEventListener('click', (event) => {
  event.preventDefault();
  resetImages();

    const options = {
        name: input.value.trim(),
        pageNumber: currentPageNumber
  }
      
  API.getPhotos(options).then((response) => {

    if (response.data.total === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    Notify.success(`We have found ${response.data.totalHits} images`);
    /* showBtn(); */
    galleryPhotos.renderGallery(response.data.hits);

    if (response.data.total !== response.data.totalHits) {
        setTimeout(() => {
           infiniteScrollInit()
        }, 1000);
    }
  }).catch(() => {
    Notify.failure("Sorry, an Error has occurred!")
  });
});

input.addEventListener('input', () => {

  const inputValue = input.value.trim();

  if (inputValue.length === 0) {
      btnSearch.disabled = true;
  } else {
      btnSearch.disabled = false;
  }
});

function resetImages() {
  gallery.innerHTML = "";
}

function getMorePhotos(onResponse) {
  const options = {
          name: input.value.trim(),
          pageNumber: currentPageNumber += 1
  }

  API.getPhotos(options)
    .then(onResponse)
    .catch((error) => {
      if (error.response.status === 400) {
          observer.disconnect();
          Notify.info("We're sorry, but you've reached the end of search results.")
      }
    });
}

function showMorePhotos(response) {
  /* showBtn(); */
  if (response.data.hits.length === 0) {
    observer.disconnect();
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }

  galleryPhotos.renderGallery(response.data.hits);
  scroll.scrollSmooth(); 
};

function infiniteScrollInit() {

  const markup = `<div id="scroll-trigger"></div>`
  gallery.insertAdjacentHTML('afterend', markup);

  observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {          
          throttled(showMorePhotos);
        }
      });
  });
  
  observer.observe(document.querySelector('#scroll-trigger'));
}



/* loadMorePhotos.addEventListener('click', () => {
const options = {
    name: input.value.trim(),
    pageNumber: currentPageNumber += 1
  }
  hideBtn();

  getMorePhotos(options);
}); */

/* function showBtn() {
  loadMorePhotos.classList.remove("hide");
} */

/* function hideBtn() {
  loadMorePhotos.classList.add("hide");
} */















