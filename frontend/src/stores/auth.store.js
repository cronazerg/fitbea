import {defineStore} from 'pinia';
import {ref} from "vue";
// import {useAlertStore} from '@/stores';
import router from "../router";

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore('auth', () => {
  const isLogged = ref(false);
  const authToken = ref(null);
  const userData = ref(null);

  const login = async ({username, password}) => {
    try {
      await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          withCredentials: false,
        },
        body: JSON.stringify({
          email: username,
          password: password
        }),
      }).then((response) =>
        response.json()
      ).then((data) => {
        if (data.token) {
          authToken.value = data.token;
          userData.value = data.user;
          isLogged.value = true;
          router.push({name: 'home'});
        }
      })
    } catch (error) {
      isLogged.value = false;
      throw new Error(data);
    }
  }

  const logout = async () => {
    isLogged.value = false;
    await router.push({name: "login"});
  };

  return {isLogged, login, logout, authToken, userData}
});

