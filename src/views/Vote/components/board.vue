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
import useEthers from '@/hooks/useEthers'

const { VoteContract, provider } = useEthers()

const data = reactive({
  board: []
})
const vote = async (i: number) => {
  console.log('vote', i)
  const signer = await provider.getSigner()
  const contractWithSigner = await VoteContract.connect(signer)
  const res = await contractWithSigner.vote(i)
  console.log('res', res)
}
const initEventListen = () => {
  VoteContract.on('VoteSuccess', async (msg: string) => {
    console.log('智能合约触发事件：', msg)
    await getBoardInfo()
  })
  // .({ fromBlock: 0 }, (err: Error, event: any) => {
  //   console.log('监听执行')
  //   console.log('event', event)
  // })
  // .on('data', (event: any) => {
  //   console.log('智能合约触发事件：', event)
  // })
}
const getBoardInfo = async () => {
  const res = await VoteContract.getBoardInfo()
  data.board = res
}
onMounted(async () => {
  initEventListen()
  await getBoardInfo()
})
</script>
<style scoped lang="less"></style>
