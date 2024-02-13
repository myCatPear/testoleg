import { createApp } from 'vue'
import './assets/styles/vars.scss'
import './assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import { initAppearance } from '@/composables/app/useAppConfig'
import { loadIcons } from '@/utils/icons'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

initAppearance()
loadIcons()

await Promise.all([router.isReady()])

app.mount('#app')
