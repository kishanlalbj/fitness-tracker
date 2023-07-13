import axios from '../utils/axios';

export const loginRequest = (username, password) =>
  axios.post(`/api/auth/login`, {
    username,
    password
  });

export const getUserRequest = () => axios.get('/api/auth/profile');

export const getMetricsRequest = () => axios.get('/api/metrics/chart');

export const registerUserRequest = (registerForm) => {
  console.log({
    registerForm
  });
  return axios.post('/api/auth/register', {
    ...registerForm
  });
};
