<script setup>
import { Nav } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
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