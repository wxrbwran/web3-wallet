<template>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
  <van-tabbar v-model="active" @change="handleChanceTab">
    <van-tabbar-item name="wallet" icon="home-o">钱包</van-tabbar-item>
    <van-tabbar-item name="erc20" icon="cash-o">ERC20</van-tabbar-item>
    <van-tabbar-item name="vote" icon="like-o">投票</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import ERC20 from '@/views/ERC20/index.vue'
import Wallet from '@/views/Wallet/index.vue'
import Vote from '@/views/Vote/index.vue'

import { useRouter } from 'vue-router'

type TPath = 'wallet' | 'erc20' | 'vote'

const pathMap = {
  wallet: Wallet,
  erc20: ERC20,
  vote: Vote
}

const router = useRouter()

const curActive: TPath = (router.currentRoute.value.query?.tab as TPath) ?? 'vote'

const curView = pathMap[curActive]

const active = ref<TPath>(curActive)
const view = shallowRef(curView)

const handleChanceTab = (e: TPath) => {
  active.value = e
  view.value = pathMap[e]
  router.replace({
    name: 'home',
    query: {
      tab: e
    }
  })
}
</script>
