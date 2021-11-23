import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=24403049-2d622057a7d1ef54c20b3a063';

async function getPhotos({ name, pageNumber }) {
    return await axios.get(`${BASE_URL}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
}

export default { getPhotos }