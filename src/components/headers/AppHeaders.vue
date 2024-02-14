<script setup lang="ts">
import { ref } from 'vue'
import NewTodoDialog from '@/components/dialogs/NewTodoDialog.vue'


const dialog = ref(false)
</script>

<template>
  <NewTodoDialog v-if="dialog" v-model="dialog" />

  <header class="app-header">
    <h1><router-link to="/" class="app-logo">Todolist</router-link></h1>
    <v-btn color="primary" @click="dialog = true">
      Add todo
    </v-btn>
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
