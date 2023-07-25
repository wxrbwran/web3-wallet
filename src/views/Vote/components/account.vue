<template>
  <div class="mt-[5px]">
    <div>
      <van-list
        loading-text="正在加载代币信息"
        v-model:loading="data.loading"
        :finished="data.finished"
      >
        <van-cell
          v-for="item in Object.keys(AccountInfoMap)"
          :key="item"
          :title="AccountInfoMap[item]"
          :title-style="{ flex: '0 0 25%' }"
          value-class="hover:(font-balck text-(red-500 [16px]))"
          :value="`${data.accountInfo[item]}`"
        />
      </van-list>
      <van-divider dashed>受托人地址</van-divider>
      <van-form @submit="handleDelegate">
        <van-field
          label-width="19vw"
          placeholder="受托人地址"
          v-model="data.delegator"
          name="delegator"
          :rules="[
            { required: true, message: '请填写受托人地址' },
            {
              validator: (value) => value.startsWith('0x') && value.length === 42,
              message: '主持人地址格式错误'
            }
          ]"
        >
          <template #right-icon>
            <van-button size="small" type="warning" native-type="submit">委托</van-button>
          </template>
        </van-field>
      </van-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { AccountInfoMap } from '@/utils/consts'
import useWeb3 from '@/hooks/useWeb3'
import { showToast } from 'vant'

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
  },
  delegator: ''
})
const getVoterInfo = async () => {
  const account = await getAccount()
  data.accountInfo.account = account
  const voterInfo = await VoteContract.methods.voters(account).call()
  data.accountInfo = { account, ...voterInfo }
}
const handleDelegate = async (values: { delegator: string }) => {
  console.log('values', values)
  VoteContract.methods
    .delegate(values.delegator)
    .send({ from: data.accountInfo.account })
    .on('receipt', async (event: any) => {
      console.log('event', event)
      showToast({ type: 'success', message: '委托他人代投成功' })
      await getVoterInfo()
    })
    .on('error', (err: any) => {
      // console.log(err.message)
      showToast({
        type: 'fail',
        message: err.message
      })
    })
}

onMounted(async () => {
  await getVoterInfo()
})
</script>
<style scoped lang="less"></style>
