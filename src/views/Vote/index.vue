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

// console.log('web3', web3)
// const initContract = async () => {
//   const VoteContract: any = new web3.eth.Contract(
//     VoteContractJSON.abi as any
//     // 部署地址 暂未部署，eth不够
//     // '0xEc20Ff7B90ecf57BBef561a2b56124cC370bF32a'
//   )
//   console.log('VoteContract', VoteContract)
//   contract.value = VoteContract
// }

onMounted(async () => {
  // initContract()
})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
