import './sass/main.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './get-api';
import galleryPhotos from './renderGallery';
import scroll from './scroll';

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
const gallery = document.querySelector(".gallery");
/* const loadMorePhotos = document.querySelector(".load-more"); */
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

 window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        const options = {
          name: input.value.trim(),
          pageNumber: currentPageNumber += 1
      }

      getMorePhotos(options, showMorePhotos);
    }
});

function resetImages() {
  gallery.innerHTML = "";
}

function getMorePhotos(options, onResponse) {
  API.getPhotos(options)
    .then(onResponse)
    .catch(() => {
    Notify.info("We're sorry, but you've reached the end of search results.")
  });
}

function showMorePhotos(response) {
    /* showBtn(); */
  galleryPhotos.renderGallery(response.data.hits);
  scroll.scrollSmooth(); 
};



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















