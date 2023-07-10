import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import App from './App.vue'
import router from './router'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import storage from '@/utils/storage'

window.$storage = storage('web3-wallet')

const app = createApp(App)

const pinia = createPinia()
const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use(installPersistedStatePlugin)

app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app')
