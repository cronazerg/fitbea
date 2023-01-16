import {defineStore} from 'pinia';
import {ref} from "vue";

import makeBodyRequest from '@/helpers/apiService';
import router from "../router";
import { useAuthStore } from '@/stores';
import { createToaster } from "@meforma/vue-toaster";

const toasterAlert = createToaster({ /* options */ });

export const useUsersStore = defineStore('users', () => {
  const user = ref(null);
  const usersData = ref(null);
  const authStore = useAuthStore();

  const register = async ({name, lastName, email, phone, password}) => {
    try {
      await makeBodyRequest('http://localhost:8000/users', {
        method: 'post', body: {
          name: name, last_name: lastName, email: email, phone: phone, password: password
        }
      })
        .then((response) => response.json())
        .then((data) => {
          user.value = data
        })
        .then(await router.push({name: "login"}));
    } catch (error) {
      throw new Error(error);
    }
  }

  const getAll = async () => {
    try {
      await fetch('http://localhost:8000/users', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authStore?.authToken
        }
      })
      // wait for the response
        .then((response) => response.json())
        .then((data) => {
          usersData.value = data.users;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const updateUserDataById = async (id, {name, lastName, phone, email, edit_by}) => {
    try {
      // await makeBodyRequest(`http://localhost:8000/users/userData/${id}`, {
      //   method: 'put', body: {
      //     name: name,
      //     last_name: lastName,
      //     phone: phone,
      //     email: email,
      //     edit_by: edit_by
      //   },
      // })
      await fetch(`http://localhost:8000/users/userData/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          last_name: lastName,
          // phone: phone,
          // email: email,
          edit_by: edit_by
        })
      })
        .then((response) => response.json())
        .then(() => {
          getAll();
        })
    } catch (error) {
      throw new Error(error);
    }
  }

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:8000/users/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authStore?.authToken
        }
      })
        .then((response) => response.json())
        .then((data) => {
          usersData.value = data.users;
          toasterAlert.success('Użytkownik pomyślnie usinięty');
          getAll();
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  // const getById = async(id) => {
  //   this.user = {loading: true};
  //   try {
  //     this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
  //   } catch (error) {
  //     this.user = {error};
  //   }
  // }
  //
  // const update = async (id, params) => {
  //   await fetchWrapper.put(`${baseUrl}/${id}`, params);
  //
  //   // update stored user if the logged in user updated their own record
  //   const authStore = useAuthStore();
  //   if (id === authStore.user.id) {
  //     // update local storage
  //     const user = {...authStore.user, ...params};
  //     localStorage.setItem('user', JSON.stringify(user));
  //
  //     // update auth user in pinia state
  //     authStore.user = user;
  //   }
  // }

  return {register, getAll, usersData, deleteUser, updateUserDataById}
});
