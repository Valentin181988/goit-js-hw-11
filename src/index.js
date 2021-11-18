import './sass/main.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://pixabay.com/api/?key=24403049-2d622057a7d1ef54c20b3a063';

const input = document.querySelector("input[name=searchQuery]");
const btnSearch = document.querySelector(".search");
const gallery = document.querySelector(".gallery");

btnSearch.addEventListener('click', (event) => {
    event.preventDefault();
    const options = {
        name: input.value,
        pageNumber: 1
    }
      
    getPhotos(options).then((response) => {
        if (response.data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        Notify.success(`We have found ${response.data.totalHits} images`);

        

        renderImages()
    });
});

function getPhotos({ name, pageNumber}) {
    return axios.get(`${BASE_URL}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
}

function renderImages(image) {
    const markup = `<div class="photo-card">
                      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                      <div class="info">
                        <p class="info-item">
                          <b>Likes</b>
                          ${image.likes}
                        </p>
                        <p class="info-item">
                          <b>Views</b>
                          ${image.views}
                        </p>
                        <p class="info-item">
                          <b>Comments</b>
                          ${image.comments}
                        </p>
                        <p class="info-item">
                          <b>Downloads</b>
                          ${image.downloads}
                        </p>
                      </div>
                    </div>`
    gallery.insertAdjacentHTML('beforeend', markup);
}




