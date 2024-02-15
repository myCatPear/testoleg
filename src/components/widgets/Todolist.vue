<script setup lang="ts">
import { computed } from 'vue'
import { useTodolistStore } from '@/stores/useTodolistStore'
import Todo from '@/components/ui/Todo.vue'
import type { TodolistInfoType, TodolistStatusType } from "@/assets/types/todolist";

// Получить управление и список тудулистов
const { getAllTodolist, changeTodoStatus, deleteTodo, currentStatusFilter, getTodolistByFilter } = useTodolistStore()

const getTodolists = computed(() => {
    if (currentStatusFilter.value === 'all') return getAllTodolist.value
    return getTodolistByFilter.value;

})

// Изменился статус выполнения туду
const changedTodoStatus = (todo: TodolistInfoType, newStatus: TodolistStatusType) => {
    changeTodoStatus(todo, newStatus)
}

// Произошёл клик по иконке удалить туду
const onDeleteTodoIconClick = (todo: TodolistInfoType) => {
    deleteTodo(todo.id)
}
</script>

<template>
    <p>Set filter:</p>
    <v-radio-group v-model="currentStatusFilter" inline>
        <v-radio label="All" value="all"></v-radio>
        <v-radio label="Todo" value="todo"></v-radio>
        <v-radio label="In progress" value="progress"></v-radio>
        <v-radio label="Done" value="done"></v-radio>
    </v-radio-group>
    <v-card class="todolists">
        <Todo v-for="item in getTodolists" :todo="item" @changed-todo-status="changedTodoStatus"
            @delete="onDeleteTodoIconClick" />
    </v-card>
    {{ getAllTodolist }}
</template>

<style scoped lang="scss">
.todolists {
    min-height: 10rem;
    padding: 0.4rem;
}
</style>