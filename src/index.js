import './css/styles.css';

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
 
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
const guard = document.querySelector('.js-guard');


let page = 1;
let searchQuery = '';
let currentHits = 0;

const option = {
    root: null,
    rootMargin: '200px',
    threshold: 1.0
}
   const observer = new IntersectionObserver(onInfinityLoad, option)

const BASE_URL = 'https://pixabay.com/api/'
const KEY_API = '32875464-b0eaa8b0d7d7f8361833525ce';

async function getAxios(inputrequest) {
    try {
    const response = await axios.get(`${BASE_URL}/?key=${KEY_API}&q=${inputrequest}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
        return response.data;
    } catch (error) {
        console.log(error.toJSON())
    }

}

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
        gallery.innerHTML = '';
       loadBtn.classList.add('is-hidden'); 
    }
    
    try {
        
        let inputrequest = e.currentTarget.searchQuery.value.trim();
        const response = await getAxios(inputrequest).then(response => { markupPost(response.hits) })
        observer.observe(guard);
        if (response.totalHits > 40) {
            loadBtn.classList.remove('is-hidden');
        } else {
            loadBtn.classList.add('is-hidden');
        }
    }
    catch (err) {
        Notify.failure(`Sorry, there are no images matching your search query. Please try again.`)
    }
}

loadBtn.addEventListener('click', onLoad)

function onLoad() {
    page += 1;
    getAxios(searchQuery, page);
    markupPost(response.hits)
    lightbox.refresh(); 
    if (currentHits === res.totalHits) {
         loadBtn.classList.add('is-hidden')
     }
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
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
            page += 1
            getAxios(inputrequest).then(response => {
                markupPost(response.hits)
            })

        }
    })
}