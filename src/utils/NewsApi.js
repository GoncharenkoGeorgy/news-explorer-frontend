import {
  BASE_URL,
  API_KEY,
  DATE_TO,
  DATE_FROM,
  PAGE_SIZE,
} from './config';

export function sendRequest(keyword) {
  return fetch(`${BASE_URL}?q=${keyword}&apiKey=${API_KEY}&from=${DATE_FROM}&to=${DATE_TO}&pageSize=${PAGE_SIZE}`,  {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    } 
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    });
}

export function getNews(keyword) {
  return sendRequest(keyword);
}