import './css/styles.css';

import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
 
const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');


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
    try {
        let inputrequest = e.target.value;
           const test =  await getAxios(inputrequest)
            return markupPost(data)    
        }
    catch (err) {
        { Notify.failure(`Sorry, there are no images matching your search query. Please try again.`) }
    }
}


function markupPost(data) {
   const markup = data.map( ({largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
       downloads }) => `<a class="gallery__item" href="${largeImageURL}">
                  <div class="photo-card">
                      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                      <div class="info">
                        <p class="info-item"><b>Likes</b> ${likes}</p>
                        <p class="info-item"><b>Views</b> ${views}</p>
                        <p class="info-item"><b>Comments</b> ${comments}</p>
                        <p class="info-item"><b>Downloads</b> ${downloads}</p>
                      </div>
                    </div>
                 </a>`);
    gallery.innerHTML = markup.join('');
}
       

