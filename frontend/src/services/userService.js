import axios from 'axios';

const userService = {
  getAll: () => {
    return axios.get('localhost:8000/users');
  }
}