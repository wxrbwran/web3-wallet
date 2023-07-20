import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import App from './App.vue'
import router from './router'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import storage from '@/utils/storage'
import Web3 from 'web3'
import { InfuraGoerliWsUrl } from './utils/consts'
import 'virtual:uno.css'
import 'animate.css'
// console.log('qtumContract', qtumContract)

window.$storage = storage('web3-wallet')

const app = createApp(App)

// web3
const web3: Web3 = new Web3(Web3.givenProvider || InfuraGoerliWsUrl)
app.config.globalProperties.web3 = web3

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
