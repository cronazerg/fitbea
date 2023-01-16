<script setup>
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.isLogged" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Strona główna</router-link>
            <router-link v-if="authStore.userData?.role_idrole === 1" to="/users" class="nav-item nav-link">Użytkownicy</router-link>
            <router-link to="/calendar" class="nav-item nav-link">Kalendarz</router-link>
            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Wyloguj</button>
        </div>
    </nav>
</template>

<style lang="scss">
.bg-dark {
  height: 70px;
  background-color: #222 !important;
}
</style>