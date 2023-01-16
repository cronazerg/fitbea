<script setup>
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="app">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">

.app {
  max-width: 100%;
}

</style>