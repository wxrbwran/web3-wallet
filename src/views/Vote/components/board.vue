<template>
  <div class="mt-[5px] pb-[15px]">
    <div v-if="data.board.length > 0">
      <van-cell :title="b[0]" icon="shop-o" v-for="(b, i) in data.board" :key="b[0] + i">
        <template #right-icon>
          <!-- <span>{{ JSON.stringify(b) }}</span> -->
          <van-button type="warning" @click="vote(i)" size="small">{{ b[1] }}</van-button>
          <van-divider></van-divider>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script setup lang="ts">
import useWeb3 from '@/hooks/useWeb3'

const { VoteContract, getAccount } = useWeb3()

const data = reactive({
  board: []
})
const vote = async (i: number) => {
  console.log('vote', i)
  const account = await getAccount()
  const res = await VoteContract.methods.vote(i).send({ from: account })
  console.log('res', res)
  await getBoardInfo()
}
const initEventListen = () => {
  VoteContract.events
    .VoteSuccess({ fromBlock: 0 }, (err: Error, event: any) => {
      console.log('监听执行')
      console.log('event', event)
    })
    .on('data', (event: any) => {
      console.log('智能合约触发事件：', event)
    })
}
const getBoardInfo = async () => {
  const res = await VoteContract.methods.getBoardInfo().call()
  console.log('getBoardInfo', res)
  data.board = res
}
onMounted(async () => {
  initEventListen()
  await getBoardInfo()
})
</script>
<style scoped lang="less"></style>
