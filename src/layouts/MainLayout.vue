<script setup lang="ts">
import AppHeader from '@/components/headers/AppHeaders.vue'
</script>

<template>
    <div class="app">
        <AppHeader />

        <div class="app-main">
            <router-view />
        </div>
    </div>
</template>

<style scoped lang="scss">
.app {
    height: 100vh;
    display: flex;
    flex-direction: column;

    &-main {
        flex-grow: 1;
        overflow: hidden;
    }
}
</style>