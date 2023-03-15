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
  const usersDataLimit = ref(null);
  const userToEdit = ref(null);

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

  const getAll = async (limit = 10, offset = 1) => {
    try {
      await fetch(`http://localhost:8000/users/${limit}/${offset}`, {
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
          usersDataLimit.value = data.count;
        })

    } catch (error) {
      throw new Error(error);
    }
  }

  const saveUser = async ({id, role_idrole, name, lastName, email, phone}) => {
    userToEdit.value = {
      id: id,
      role_idrole: role_idrole,
      name: name,
      lastName: lastName,
      email: email,
      phone: phone,
      edit_by: authStore?.userData?.iduser
    }


    localStorage.setItem('userToEdit', JSON.stringify(userToEdit.value));
    await router.push({name: "addEdit"})
  }

  const updateUserDataById = async (id, {role, name, lastName, phone, email, edit_by}) => {
    try {
      await fetch(`http://localhost:8000/users/userData/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: role,
          name: name,
          last_name: lastName,
          phone: phone,
          email: email,
          edit_by: edit_by
        })
      })
        .then((response) => {
          if (response.status === 200) {
            response.json()
            toasterAlert.success("Pomyślnie zmieniono dane");
          } else {
            toasterAlert.error("Błąd podczas zmiany danych");
          }
        }).then(async () => {
          await router.push({name: "users"})
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

  return {register, getAll, usersData, usersDataLimit, deleteUser, updateUserDataById, userToEdit, saveUser}
});
