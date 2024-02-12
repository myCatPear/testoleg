import { createApp } from 'vue'
import './assets/styles/vars.scss'
import './assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import { initAppearance } from '@/composables/app/useAppConfig'
import { loadIcons } from '@/utils/icons'
const app = createApp(App)

app.use(router)

initAppearance()
loadIcons()

await Promise.all([router.isReady()])

app.mount('#app')
