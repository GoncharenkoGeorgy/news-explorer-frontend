 export const API_KEY = '4605b397b0a24869b8bfb135118ce7f7';

 export const BASE_URL = 'https://nomoreparties.co/news/v2/everything';

 export const SHOW_NEWS_ON_PAGE = 3;

 const dateTo = new Date().toLocaleString('sv', {
     year: 'numeric',
     month: '2-digit',
     day: '2-digit',
 });

 const dateFrom = new Date(
     Date.now() - (24 * 3600 * 1000 * 7)
).toISOString().slice(0, 10);

export const DATE_TO = dateTo;
export const DATE_FROM = dateFrom;
export const PAGE_SIZE = 100;