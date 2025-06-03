import axios from "./axios.customize";

const fetchDataBooks = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};

const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
  const URL_BACKEND = '/api/v1/book';
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(URL_BACKEND, data);
};

const updateBookAPI = (_id, mainText, author, price, quantity, category, thumbnail) => {
  const URL_BACKEND = '/api/v1/book';
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL_BACKEND, data);
};

export {  fetchDataBooks, createBookAPI, updateBookAPI };