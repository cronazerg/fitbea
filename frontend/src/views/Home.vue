<script>

import { useAuthStore } from '@/stores';

export default {
  name: "Home",
  setup() {
    const authStore = useAuthStore();
    return { authStore }
  },

  data() {
    return {
      userData: null,
    }
  },

  computed() {
  },

  mounted() {
    // if (this.authStore.isLogged) {
    //   this.userData = this.authStore.userData;
    //   console.log(this.userData);
    // }
  }
}


</script>

<template>
    <div>
        <h1 v-if="authStore.isLogged"> Hi {{  authStore.userData.name }} !</h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
        <p><router-link to="/users">Manage Users</router-link></p>
        <p v-if="!authStore.isLogged"><router-link to="/account/login">Zaloguj się</router-link></p>
    </div>
</template>
