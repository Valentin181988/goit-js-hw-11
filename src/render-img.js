const gallery = document.querySelector(".gallery");

function renderImage(image) {
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

export default { renderImage }