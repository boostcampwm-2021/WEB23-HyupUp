import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/storys',
  withCredentials: true,
});
