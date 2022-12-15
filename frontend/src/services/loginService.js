import axios from 'axios';

const loginService = {
  login: (username, password) => {
    return axios.post('/api/login', { username, password });
  }
}