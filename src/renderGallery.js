import renderImg from './render-img';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox(".photo-card a");

function renderGallery(hits) {
  hits.map((image) => {
      renderImg.renderImage(image);
    }).join('');
   
    lightbox.refresh();
}

export default { renderGallery };