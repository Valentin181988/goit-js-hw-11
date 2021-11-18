import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const BASE_URL = 'https://pixabay.com/api/?key=24403049-2d622057a7d1ef54c20b3a063';
import API from './get-api';
import renderImg from './render-img';

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
const gallery = document.querySelector(".gallery");
const lightbox = new SimpleLightbox(".photo-card a");

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    const options = {
        name: input.value.trim(),
        pageNumber: 1
    }

    if (!options.name) {
      btnSearch.ariaDisabled();
      return;
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

    options.pageNumber += 1;
});









