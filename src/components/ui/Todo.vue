<script setup lang="ts">
import { PropType,ref } from 'vue'
import type { TodoInfoType, TodoStatusType } from '@/assets/types/todolist'

const props = defineProps({
  todo: {
    type: Object as PropType<TodoInfoType>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'changedTodoStatus', todo: TodoInfoType, newStatus: TodoStatusType)
  (e: 'edit', todo: TodoInfoType)
  (e: 'delete', todo: TodoInfoType)
  (e: 'click', todo: TodoInfoType)
}>()

const onChangeStatusButtonClick = (event:MouseEvent, todo:TodoInfoType, status:TodoStatusType) => {
  event.stopPropagation()
  emits('changedTodoStatus', todo, status)
}

const onEditButtonClick = (event:MouseEvent, todo:TodoInfoType) => {
  event.stopPropagation()
  emits('edit', todo)
}


const onDeleteStatusButtonClick = (event:MouseEvent, todo:TodoInfoType) => {
  event.stopPropagation()
  emits('delete', todo)

}

</script>

<template>
  <div
    class="todo"
    :class="[
      todo.status === 'todo' && 'todo__todo',
      todo.status === 'progress' && 'todo__in-progress',
      todo.status === 'done' && 'todo__done'
    ]"
    @click="emits('click', todo)"
  >
    <div
      v-if="todo.status === 'todo'"
      class="todo__icon todo__icon-todo"
      @click="event => onChangeStatusButtonClick(event, todo, 'progress')"
    >
      <v-icon icon="mdi-arrow-right"></v-icon>
    </div>
    <div
      v-if="todo.status === 'progress'"
      class="todo__icon todo__icon-progress"
      @click="event => onChangeStatusButtonClick(event, todo, 'done')"
    >
      <v-icon icon="mdi-check"></v-icon>
    </div>
    <div
      v-if="todo.status === 'done'"
      class="todo__icon todo__icon-done"
      @click="event => onChangeStatusButtonClick(event, todo, 'progress')"
    >
      <v-icon icon="mdi-arrow-left"></v-icon>
    </div>
    <p>{{ todo.title }}</p>
    <div class="todo__icon-management">
      <div class="todo__icon" @click="event => onEditButtonClick(event, todo)">
        <v-icon v-if="todo.status !== 'done'" icon="mdi-pencil"></v-icon>
      </div>
      <div class="todo__icon" @click="event => onDeleteStatusButtonClick(event, todo)">
        <v-icon icon="mdi-trash-can"></v-icon>
      </div>
    </div>
    <div
      v-if="todo.status === 'done'"
      class="todo__line"
      @click="emits('changedTodoStatus', todo, 'progress')"
    />
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
  &:hover {
    cursor: pointer;
    background-color: rgb(165, 92, 233);
  }
  &:hover &__icon {
    opacity: 1;
  }
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
    opacity: 0;
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
