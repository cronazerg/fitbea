<script>

import dayjs from 'dayjs';
import { useUsersStore, useAuthStore } from '@/stores';
import router from "../../router";

export default {
  name: "List",
  setup() {
    const userStore = useUsersStore();
    const authStore = useAuthStore();
    return {
      userStore,
      authStore
    };
  },

  data() {
    let authStore = useAuthStore();
    return {
      usersData: null,
      users: [],
      dayjs: dayjs,
      errors: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      edit_by: authStore.userData.iduser
    }
  },

  methods: {
    writeConsole(data) {
      console.log(data);
    },

    async onEdit(id) {
      try {
        await this.userStore.updateUserDataById(id, {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          phone: this.phone,
          edit_by: this.edit_by,
        });
      } catch (error) {
        console.log(error);
        this.error = error;
        this.name = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
      }
    },

    saveUser(user) {
      this.userStore.saveUser({
        id: user.iduser,
        role_idrole: user.role_idrole,
        name: user.name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        edit_by: this.edit_by,
      });
    }
  },

  created() {
    this.userStore.getAll();
  }
}


</script>

<template>
  <div class="usersView" v-if="authStore.userData.role_idrole === 1">
    <h1 class="mainHeader">Użytkownicy</h1>
    <table id="users">
      <thead>
      <tr>
        <th>id</th>
        <th>id_role</th>
        <th>created_by</th>
        <th>name</th>
        <th>last_name</th>
        <th>email</th>
        <th>phone</th>
        <th>created_at</th>
        <th>created_by</th>
        <th>edit_by</th>
        <th>edit_date</th>
        <th>Usuń</th>
        <th>Edytuj</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in userStore.usersData" :key="user.iduser">
        <td>{{ user.iduser }}</td>
        <td>{{ user.role_idrole }}</td>
        <td>{{ user.created_by }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ dayjs(user.created_at).format('YYYY-MM-DD') }}</td>
        <td>{{ user.created_by }}</td>
        <td>{{ user.edit_by }}</td>
        <td>{{ dayjs(user.edit_date).format('YYYY-MM-DD') }}</td>
        <td>
          <button @click=this.userStore.deleteUser(user.iduser)>Usuń</button>
        </td>
        <td>
          <button @click=this.saveUser(user)>Edytuj</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <h1>Brak dostępu</h1>
  </div>

</template>

<style>
.usersView {
  padding: 20px 30px;
}

.mainHeader {
  padding: 20px 0;
}

#users {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#users td, #users th {
  border: 1px solid #ddd;
  padding: 8px;
}

#users td button {
  background-color: #4b5897;
  border: none;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

#users td button:hover {
  color: #333;
  background-color: #f2f2f2;
}

#users tr:nth-child(even) {
  background-color: #f2f2f2;
}

#users tr:hover {
  background-color: #ddd;
}

#users th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4b5897;
  color: white;
}

</style>