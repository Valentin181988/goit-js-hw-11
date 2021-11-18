async function getPhotos({ name, pageNumber}) {
    return await axios.get(`${BASE_URL}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`);
}

export default { getPhotos }