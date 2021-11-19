import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import API from './get-api';
import renderImg from './render-img'; 

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
/* const gallery = document.querySelector(".gallery"); */
const lightbox = new SimpleLightbox(".photo-card a");
const loadMorePhotos = document.querySelector(".load-more");

btnSearch.disabled = true;

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    const options = {
        name: input.value.trim(),
        pageNumber: 1
    }
      
  API.getPhotos(options).then((response) => {
    console.log(response)
    if (response.data.total === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    Notify.success(`We have found ${response.data.totalHits} images`);

    response.data.hits.map((image) => {
      renderImg.renderImages(image);
    }).join('');
        
    lightbox.refresh();
  }).catch(() => {
    Notify.failure("Sorry, an Error has occurred!")
  });

  showBtn();
});

input.addEventListener('input', () => {
  const inputValue = input.value.trim();
  if (inputValue.length === 0) {
      btnSearch.disabled = true;
  } else {
      btnSearch.disabled = false;
  }
});

loadMorePhotos.addEventListener('click', (event) => {

  const options = {
    name: input.value.trim(),
    pageNumber: 1
  }
  
  API.getPhotos(options).then((response) => {
    console.log(response)

    response.data.hits.map((image) => {
      renderImg.renderImages(image);
    }).join('');
        
    lightbox.refresh();
  }).catch(() => {
    Notify.failure("Sorry, an Error has occurred!")
  });
});

function showBtn() {
  loadMorePhotos.classList.remove("hide");
}













