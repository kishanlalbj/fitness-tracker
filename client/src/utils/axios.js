import axios from 'axios';

const customAxios = axios.create({
  withCredentials: true
});

customAxios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('tk')}`;
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default customAxios;
