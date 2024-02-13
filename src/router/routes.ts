import type { RouteRecordRaw } from 'vue-router'
import AppHomeView from '@/views/AppHomeView.vue'
import TodoView from '@/views/TodoView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: AppHomeView
  },
  {
    path: '/todo/',
    name: 'todo',
    component: TodoView
  }
]

export { routes }
