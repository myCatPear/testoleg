<script setup lang="ts">
import {ref} from 'vue';
import router from '@/router'
import { useTodolistStore } from '@/stores/useTodolistStore'
import { APP_HOME_PATH_NAME } from '@/assets/constants/routes'
import TodoEditorDialog from '@/components/dialogs/TodoEditorDialog.vue'

const { getTodoInfo, deleteTodo } = useTodolistStore()

const todoId = router.currentRoute.value.params.id as string

const getTodoInfoFromStore = ref(getTodoInfo(todoId))

const isShowdialog = ref(false)

const onBackButtonClick = () => {
  router.push({ name: APP_HOME_PATH_NAME })
}

const onDeleteButtonClick = () => {
  deleteTodo(todoId)
  onBackButtonClick()
}
</script>

<template>
  <TodoEditorDialog v-if="isShowdialog" v-model="isShowdialog" :action="'edit'" :todo="getTodoInfoFromStore" @done="getTodoInfoFromStore = getTodoInfo(todoId)"/>


  <div class="todo-info__buttons">
    <div class="todo-info__buttons_back" @click="onBackButtonClick">
      <v-icon icon="mdi-arrow-left"></v-icon>
      <span>Back</span>
    </div>
    <div class="todo-info__buttons_manadgment">
      <v-btn :disabled="!getTodoInfoFromStore" @click="isShowdialog = true"> Edit </v-btn>
      <v-btn :disabled="!getTodoInfoFromStore" @click="onDeleteButtonClick"> Delete </v-btn>
    </div>
  </div>

  <v-card class="todo-info__main">
    <template v-if="getTodoInfoFromStore">
      <div class="todo-info__item">
        <b>Title:</b>
        {{ getTodoInfoFromStore.title }}
      </div>
      <div v-if="getTodoInfoFromStore && getTodoInfoFromStore.description" class="todo-info__item">
        <b>Description:</b>
        {{ getTodoInfoFromStore.description }}
      </div>
      <div class="todo-info__item">
        <b>Status:</b>
        {{ getTodoInfoFromStore.status }}
      </div>
    </template>
    <template v-else> Error loading todo data! </template>
  </v-card>
</template>

<style scoped lang="scss">
.todo-info {
  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    &_back {
      cursor: pointer;
      padding: 0.3rem;
    }
    &_back:hover {
      cursor: pointer;
      background-color: rgb(165, 92, 233);
      border-radius: 10px;
      color: white;
    }
    &_manadgment {
      display: flex;
      gap: 0.5rem;
    }
  }
  &__main {
    min-height: 10rem;
    padding: 0.4rem;
  }
}
</style>
