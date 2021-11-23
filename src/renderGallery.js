import renderImg from './renderImage';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox(".photo-card a");
const gallery = document.querySelector(".gallery");

function renderGallery(hits) {
  let allImages = "";
  
  hits.map((image) => {
      allImages += renderImg.renderImage(image);
  }).join('');
  
  gallery.insertAdjacentHTML('beforeend', allImages);
  lightbox.refresh();
}

export default { renderGallery };