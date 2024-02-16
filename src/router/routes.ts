import type { RouteRecordRaw } from 'vue-router'
import {
  APP_HOME_PATH,
  APP_HOME_PATH_NAME,
  TODO_INFO_PATH,
  TODO_INFO_PATH_NAME
} from '@/assets/constants/routes'

const AppHomeView = () => import('@/views/AppHomeView.vue')
const TodoView = () => import('@/views/TodoView.vue')

const routes: RouteRecordRaw[] = [
  {
    path: APP_HOME_PATH,
    name: APP_HOME_PATH_NAME,
    component: AppHomeView
  },
  {
    path: TODO_INFO_PATH,
    name: TODO_INFO_PATH_NAME,
    component: TodoView
  },
  {
    path: "/:catchAll(.*)",
    redirect: APP_HOME_PATH  
  }
]

export { routes }
