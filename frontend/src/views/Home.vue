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
    <div class="homepage">
      <div class ="hero-text">
        <h1 v-if="authStore.isLogged"> Cześć {{ authStore.userData.name }} !!!</h1>
        <h2>Rozpocznij swój trening już dzisiaj!</h2>
        <p>Zobacz jakie możliwości daje nasz wspaniały kelendarz i wybierz najepszy trening dla siebie</p>
        <p class="loginButton" v-if="!authStore.isLogged">
          <router-link to="/account/login">Zaloguj się</router-link>
        </p>
      </div>
    </div>
</template>

<style lang="scss">
.homepage {
  color: #fff;
  text-align: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url("../assets/img/background.jpg");
  background-color: #cccccc;
  height: calc(95.5vh*1.05);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}


.loginButton {
  a {
    background-color: #e8e8e8;
    color: #333;
    padding: 14px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    &:hover {
      text-decoration: none;
      color: #777;
    }
  }
}



</style>