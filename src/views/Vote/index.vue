<template>
  <div class="home-content">
    <div class="p-[10px]" @click="handleClick">
      <van-divider dashed :style="{ margin: '0', color: '#ee1722' }">去中心化投票</van-divider>
      <van-tabs v-model:active="active">
        <van-tab title="分发选票">
          <Mandate></Mandate>
        </van-tab>
        <van-tab title="账户信息">
          <Account></Account>
        </van-tab>
        <van-tab title="投票看板">
          <Board></Board>
        </van-tab>
      </van-tabs>
    </div>

    <BottomNote></BottomNote>
  </div>
</template>

<script setup lang="ts">
import BottomNote from '@/components/bottom-note.vue'
import Account from './components/account.vue'
import Board from './components/board.vue'
import Mandate from './components/mandate.vue'

const active = ref(0)

onMounted(async () => {})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
