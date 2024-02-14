<script setup lang="ts">
import { useTodolistStore } from '@/stores/useTodolistStore'

const { getAllTodolist } = useTodolistStore()
</script>

<template>
    {{ getAllTodolist }}
</template>

<style scoped lang="scss"></style>