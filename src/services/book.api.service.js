import axios from "./axios.customize";

const fetchDataBooks = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};



export {  fetchDataBooks };