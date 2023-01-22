import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/'
const KEY_API = '32875464-b0eaa8b0d7d7f8361833525ce';

export default class NewApiService {
    constructor() { 
        this.inputRequest = '';
        this.page = 1;
        this.totalHits = 0;

}

    async getAxios() {
    try {
    const response = await axios.get(`${BASE_URL}/?key=${KEY_API}&q=${this.inputRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
        this.page += 1;
        return response.data;
    } catch (error) {
        console.log(error.toJSON())
    }

}
get query(){
    return this.inputRequest;
}
set query(newQuery){
    this.inputRequest = newQuery;
}
get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }
    
    resetPage() {
        this.page = 1;
    }
    
}