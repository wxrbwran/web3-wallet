<template>
  <div class="mt-[5px]">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          label="主持人地址"
          label-width="19vw"
          placeholder="主持人地址"
          v-model="data.host"
          name="host"
          label-align="top"
          :rules="[
            { required: true, message: '请填写主持人地址' }
            // {
            //   validator: (value) => value.startsWith('0x') && value.length === 42,
            //   message: '主持人地址格式错误'
            // }
          ]"
        />
        <van-field
          label="投票人地址"
          label-width="19vw"
          placeholder="投票人地址,请用,分割"
          v-model="data.voter"
          type="textarea"
          rows="8"
          name="voter"
          label-align="top"
          :rules="[
            { required: true, message: '请填写投票人地址' }
            // {
            //   validator: (value) => value.startsWith('0x') && value.length === 42,
            //   message: '投票人地址格式错误'
            // }
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="warning" native-type="submit">开始分发选票</van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { showFailToast, showToast } from 'vant'
import useEthers from '@/hooks/useEthers'

type TForm = {
  host: string
  voter: string
  voterArr: string[]
}
// type TMandate = TForm & {
//   voterAddress: string
// }

const data = reactive<TForm>({
  host: '',
  voter: '',
  voterArr: []
})
// const { getAccount, VoteContract: contract } = useWeb3()
const { VoteContract, provider } = useEthers()

const onSubmit = async (values: TForm) => {
  console.log('submit', values)
  data.voterArr = data.voter.split(',').map((a) => a.trim())
  console.log('data.voterArr', data.voterArr, toRaw(data.voterArr))
  const signer = await provider.getSigner()
  const VoteContractWithSigner = VoteContract.connect(signer)
  try {
    const tx = await VoteContractWithSigner.mandate(toRaw(data.voterArr))
    await tx.wait()
    showToast({ type: 'success', message: '分发选票成功' })
  } catch (e: any) {
    console.error(e)
    showToast({
      type: 'fail',
      message: e.message
    })
  }
}
// 获取主持人信息
const getHost = async () => {
  try {
    data.host = await VoteContract.host()
  } catch (e: any) {
    showFailToast({ message: e.message })
  }
}

onMounted(async () => {
  await getHost()
})
</script>
<style scoped lang="less"></style>
