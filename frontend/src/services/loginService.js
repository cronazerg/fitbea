import axios from 'axios';

const loginService = {
  login: (username, password) => {
    return axios.post('localhost:8000/users/login', { username, password });
  }
}

export default loginService;
