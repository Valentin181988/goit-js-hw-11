import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const BASE_URL = 'https://pixabay.com/api/?key=24403049-2d622057a7d1ef54c20b3a063';

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
const gallery = document.querySelector(".gallery");
const lightbox = new SimpleLightbox(".photo-card a");

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    const options = {
        name: input.value,
        pageNumber: 1
    }
      
    getPhotos(options).then((response) => {
        console.log(response)
        if (response.data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        Notify.success(`We have found ${response.data.totalHits} images`);

        response.data.hits.map((image) => {
            renderImages(image);
        }).join();
        
        lightbox.refresh();
    });

    options.pageNumber += 1;
});

function getPhotos({ name, pageNumber}) {
    return axios.get(`${BASE_URL}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
}

function renderImages(image) {
    const markup = `<div class="photo-card">
                        <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="img"/></a>
                         <div class="info">
                           <p class="info-item">
                             <b>Likes</b>
                             <br><span>${image.likes}</span>
                           </p>
                           <p class="info-item">
                             <b>Views</b>
                             <br><span>${image.views}</span>
                           </p>
                           <p class="info-item">
                             <b>Comments</b>
                             <br><span>${image.comments}</span>
                           </p>
                           <p class="info-item">
                             <b>Downloads</b>
                             <br><span>${image.downloads}</span>
                           </p>
                         </div>
                   </div>`
    gallery.insertAdjacentHTML('beforeend', markup);
}





