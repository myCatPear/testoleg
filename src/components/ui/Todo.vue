<script setup lang="ts">
import { PropType } from 'vue'
import type { TodolistInfoType, TodolistStatusType } from '@/assets/types/todolist'

const props = defineProps({
    todo: {
        type: Object as PropType<TodolistInfoType>,
        required: true,
    }
})

const emits = defineEmits<{
    (e: 'changedTodoStatus', todo: TodolistInfoType, newStatus: TodolistStatusType)
    (e: 'edit', todo: TodolistInfoType)
    (e: 'delete', todo: TodolistInfoType)
}>()

</script>

<template>
    <div class="todo" :class="[

        todo.status === 'todo' && 'todo__todo',
        todo.status === 'progress' && 'todo__in-progress',
        todo.status === 'done' && 'todo__done',
    ]">
        <div v-if="todo.status === 'todo'" class="todo__icon todo__icon-todo"
            @click="emits('changedTodoStatus', todo, 'progress')">
            <v-icon icon="mdi-arrow-right"></v-icon>
        </div>
        <div v-if="todo.status === 'progress'" class="todo__icon todo__icon-progress"
            @click="emits('changedTodoStatus', todo, 'done')">
            <v-icon icon="mdi-check"></v-icon>
        </div>
        <div v-if="todo.status === 'done'" class="todo__icon todo__icon-done"
            @click="emits('changedTodoStatus', todo, 'progress')">
            <v-icon icon="mdi-arrow-left"></v-icon>
        </div>
        <p>{{ todo.title }}</p>
        <div class="todo__icon-management">
            <div class="todo__icon " @click="emits('edit', todo)">
                <v-icon v-if="todo.status !== 'done'" icon="mdi-pencil"></v-icon>
            </div>
            <div class="todo__icon " @click="emits('delete', todo)">
                <v-icon icon="mdi-trash-can"></v-icon>
            </div>
        </div>
        <div v-if="todo.status === 'done'" class="todo__line" @click="emits('changedTodoStatus', todo, 'progress')" />
    </div>
</template>

<style scoped lang="scss">
.todo {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    margin-bottom: 0.3rem;
    border-radius: 10px;
    position: relative;

    &__todo {
        background-color: rgb(248, 255, 243);

    }

    &__in-progress {
        background-color: bisque;
    }

    &__done {
        background-color: rgb(99, 97, 96);
        opacity: 0.5;
    }

    &__icon {
        cursor: pointer;
        padding: 0.1rem;
    }

    &__icon:hover {
        background-color: rgb(132, 161, 187);
        border-radius: 50%;
    }

    &__icon-management {
        margin-left: auto;
        display: flex;
    }

    &__line {
        position: absolute;
        top: 50%;
        left: 0;
        height: 1px;
        width: 100%;
        background-color: black;
    }

}
</style>