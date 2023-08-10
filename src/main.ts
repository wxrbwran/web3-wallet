import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
// import App from './AppLearn.vue'
import App from './App.vue'

import router from './router'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import storage from '@/utils/storage'
import 'virtual:uno.css'
import 'animate.css'
// console.log('qtumContract', qtumContract)

window.$storage = storage('web3-wallet')

const app = createApp(App)

// pinia
const pinia = createPinia()
const installPersistedStatePlugin = createPersistedStatePlugin()
pinia.use(installPersistedStatePlugin)

app.use(pinia)
app.use(router)
app.use(Toast)

app.mount('#app')

if (window.ethereum) {
  console.log('MetaMask is installed')
}
