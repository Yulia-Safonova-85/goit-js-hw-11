import './css/styles.css';
import NewApiService from './newPostService';


import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
 

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const guard = document.querySelector('.js-guard');

const newApiPost = new NewApiService();

const option = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0,
};
   const observer = new IntersectionObserver(onInfinityLoad, option)

loadBtn.classList.add('is-hidden');
searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    try {
        gallery.innerHTML = '';
        newApiPost.query = e.currentTarget.searchQuery.value.trim();
        newApiPost.resetPage();
        
       
        await fetchPost();
        
    }
    catch (err) {
        console.log(err);
    }
}

function fetchPost() {
    loadBtn.classList.add('is-hidden');
    
    newApiPost.getAxios().then(data => {

        newApiPost.hits = data.totalHits;
        if (!newApiPost.query) {
            loadBtn.classList.add('is-hidden');
            return Notify.failure(`Sorry, there are no images matching your search query. Please try again.`);
        }
        markupPost(data.hits);
        if (data.totalHits > 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
            loadBtn.classList.remove('is-hidden');

        lightbox.refresh(); 
    }
    })
}

loadBtn.addEventListener('click', onLoad)

 function onLoad() {
     fetchPost();
    lightbox.refresh(); 
    observer.observe(guard);

    }
    

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: '250ms'  })


function markupPost(data) {
    const markup = data.map(({ largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => 
        `<a class="gallery__item" href="${largeImageURL}">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" width='300' />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`)

    gallery.innerHTML = markup.join('');

    lightbox.refresh(); 
}
      

function onInfinityLoad(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            fetchPost();
        }
    })
}