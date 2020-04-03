import axios from "axios";
import {CONFIG} from "../app.config";

axios.defaults.baseURL = CONFIG.API_BASE_URL;

const itemsPerPage = CONFIG.DB.DEFAULT_ITEMS_PER_PAGE;

export default class BooksRepository {

  static getBooks(skip = 0, limit = itemsPerPage) {
    return axios.get(`/books?skip=${skip}&limit=${limit}`);
  }

  static getSortedByTitle(skip = 0, limit = itemsPerPage) {
    return axios.get(`/books?skip=${skip}&limit=${limit}&sort=name`);
  }

  static getSortedByAuthorName(skip = 0, limit = itemsPerPage) {
    return axios.get(`/books?skip=${skip}&limit=${limit}&sort=author`);
  }

  static getFilteredByGenre(skip = 0, limit = itemsPerPage, genre) {
    return axios.get(`/books?skip=${skip}&limit=${limit}&filter[genre]=${genre}`);
  }

  static getFilteredByAuthorGender(skip = 0, limit = itemsPerPage, gender) {
    // console.log(`/books?skip=${skip}&limit=${limit}&filter[author.gender]=${gender}`)
    return axios.get(`/books?skip=${skip}&limit=${limit}&filter[author.gender]=${gender}`);
  }

  static getFilteredByHorrorGenrePublishedInHalloween(skip = 0, limit = itemsPerPage) {
    return axios.get(`/books?skip=${skip}&limit=${limit}&filter[genre]=Horror&date=10-31`);
  }
}
