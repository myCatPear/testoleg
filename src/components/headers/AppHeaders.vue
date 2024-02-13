<script setup lang="ts">
import NewTodoDialog from '@/components/dialogs/NewTodoDialog.vue'
</script>

<template>
  <header class="app-header">
    <h1><router-link to="/" class="app-logo">Todolist</router-link></h1>
    <NewTodoDialog />
  </header>
</template>

<style scoped lang="scss">
.app {
  &-logo {
    text-decoration: none;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
