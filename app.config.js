// todo: remove comments
export const CONFIG = {
  DB: {
    MONGODB_URI: 'mongodb+srv://yagolopez:yagolopez@cluster0-eitpi.mongodb.net/dbtest1?retryWrites=true&w=majority',
    // MONGODB_URI: 'mongodb://localhost:27017/dbtest1?connectTimeoutMS=10000',
    BOOKS_COLLECTION_NAME: 'collection3',
    DEFAULT_ITEMS_PER_PAGE: 20,
  },
  API_BASE_URL: process.env.BACKEND_URL,
  // API_BASE_URL: 'https://book-list.now.sh/api',
  // API_BASE_URL: 'http://localhost:3000/api',
  CRITERIA: {
    SORT_BY_TITLE: 'sorted-by-title',
    SORT_BY_AUTHOR_NAME: 'sorted-by-author-name',
    FILTER_BY_GENRE: 'filter-by-genre',
    FILTER_BY_AUTHOR_GENDER: 'filter-by-author-gender',
    FILTER_BY_HORROR_GENRE_AND_PUBLISHED_DATE_HALLOWEEN: 'filter-by-horror-genre-and-published-date-halloween',
  }
};
