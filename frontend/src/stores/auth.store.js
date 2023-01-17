import {defineStore} from 'pinia';
import {ref} from "vue";
import Cookies from "js-cookie";
import router from "../router";
import { createToaster } from "@meforma/vue-toaster";

const toasterAlert = createToaster({ /* options */ });

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore('auth', () => {
  const isLogged = ref(false);
  const authToken = ref(null);
  const userData = ref(null);

  if (Cookies.get("userData")) {
    isLogged.value = true;
    userData.value = JSON.parse(Cookies.get("userData"));
  }

  if (Cookies.get("Authorization")) {
    authToken.value = Cookies.get("Authorization");
  }

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
      }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      } ).then(data => {
        authToken.value = data.token;
        userData.value = data.user;
        isLogged.value = true;
        Cookies.set("Authorization", data.token);
        Cookies.set("userData", JSON.stringify(data.user));
        toasterAlert.success("Zalogowany!");
        router.push({name: 'home'});

      }).catch(error => {
        toasterAlert.error("Coś poszło nie tak!");
      });
    } catch (error) {
      isLogged.value = false;
      throw new Error(data);
    }
  }

  const logout = async () => {
    isLogged.value = false;
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    toasterAlert.success("Zostałeś wylogowany");
    await router.push({name: "login"});
  };

  return { isLogged, login, logout, authToken, userData }
});

