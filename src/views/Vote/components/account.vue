<template>
  <div class="mt-[5px]">
    <div>
      <van-list
        loading-text="正在加载代币信息"
        v-model:loading="data.loading"
        :finished="data.finished"
      >
        <van-cell
          v-for="item in Object.keys(data.accountInfo)"
          :key="item"
          :title="AccountInfoMap[item]"
          :title-style="{ flex: '0 0 25%' }"
          value-class="hover:(font-balck text-(red-500 [16px]))"
          :value="data.accountInfo[item]"
        />
      </van-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AccountInfoMap } from '@/utils/consts'
import useWeb3 from '@/hooks/useWeb3'

const { VoteContract, getAccount } = useWeb3()

const data = reactive({
  loading: false,
  finished: true,
  accountInfo: {
    account: '',
    amount: '',
    delegator: '',
    isVoted: '',
    targetId: ''
  }
})
const getVoterInfo = async () => {
  const account = await getAccount()
  data.accountInfo.account = account
  const voterIfo = await VoteContract.methods.voters(account).call()
  data.accountInfo = { ...data.accountInfo, ...voterIfo }
}

onMounted(() => {
  getVoterInfo()
})
</script>
<style scoped lang="less"></style>
