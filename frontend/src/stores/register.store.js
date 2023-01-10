import {defineStore} from 'pinia';
// import { ref } from "vue";
// import router from "../router";

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useRegisterStore = defineStore('auth', () => {
  const register = async ({firstname, lastName, email, password}) => {
    try {
      await fetch('http://localhost:8000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          withCredentials: false,
        },
        body: JSON.stringify({
          firstname: firstname,
          lastName: lastName,
          email: email,
          password: password
        }),
      }).then((response) => response.json())
    } catch (error) {
      throw new Error(data);
    }
  }

  return { register }
});

