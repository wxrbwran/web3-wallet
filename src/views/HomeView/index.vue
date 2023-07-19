<template>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
  <van-tabbar v-model="active" @change="handleChanceTab">
    <van-tabbar-item name="Wallet" icon="home-o">钱包</van-tabbar-item>
    <van-tabbar-item name="ERC20" icon="cash-o">ERC20</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import ERC20 from '@/views/ERC20/index.vue'
import Wallet from '@/views/Wallet/index.vue'
import { useRouter } from 'vue-router'

type TPath = 'Wallet' | 'ERC20'

const router = useRouter()

const curActive: TPath = (router.currentRoute.value.query?.tab as TPath) ?? 'ERC20'
const curView = curActive === 'ERC20' ? ERC20 : Wallet

const active = ref<TPath>(curActive)
const view = shallowRef(curView)
const handleChanceTab = (e: TPath) => {
  active.value = e
  view.value = e === 'Wallet' ? Wallet : ERC20
  router.replace({
    name: 'home',
    query: {
      tab: e
    }
  })
}
</script>
