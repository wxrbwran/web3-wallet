<template>
  <div>
    <div>
      <h1>账户信息：</h1>
      <p class="my-[10px] break-words">地址：{{ Account2 }}</p>
      <p>余额：{{ count }}</p>
      <van-divider></van-divider>

      <h1>转账操作：</h1>
      <p>当前账户向0x8F9a5cae...进行转账1eth</p>
      <van-button @click="send" type="primary" class="!my-[10px]">开始转账</van-button>
      <van-divider></van-divider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Account1, Account2 } from '@/utils/consts'
// @ts-ignore
import useEthers from '@/hooks/useEthers'

const count = ref<string>('0')
const { provider, ethers } = useEthers()

// 创建账户
const createAccount = () => {
  // const account = eth.accounts.create('kakLKASsdl@^&amsAd21asKDd0as^&*q23')
  // {
  //     "address": "0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3",
  //     "privateKey": "0x4d60e7d3aaf14f9b5462eeddb92d44ba2f496f0fc392765dfa96aeac955939a6"
  // }
}
// 余额获取
const getBalance = async (account: string) => {
  const balance = await provider.getBalance(
    // web3,
    // '0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3',
    account
    // web3.defaultBlock,
    // DEFAULT_RETURN_FORMAT
    // ETH_DATA_FORMAT
  )

  console.log('balance: ', balance, ethers.utils.formatEther(balance))
  count.value = ethers.utils.formatEther(balance)
}
// eth转账
const send = async () => {
  console.log('send')
  try {
    const gasPrice = await provider.getFeeData()
    console.log('gasPrice', gasPrice)
    // console.log('gasPrice: ', gasPrice, web3.utils.fromWei(gasPrice, 'ether'))
    // 转账金额：以wei为单位
    const value = ethers.utils.parseEther('1')
    console.log('value: ', value)
    // 构建原始数据
    const tx = {
      to: Account2,
      value,
      maxFeePerGas: gasPrice.maxFeePerGas!,
      data: '0x0000' // 不重要
    }
    const signer = await provider.getSigner()
    // 3. 开始转账
    const trans = await signer.sendTransaction(tx)
    const res = await trans.wait()
    console.log('res', res)
    getBalance(Account2)
  } catch (e) {
    console.error(e)
  }
}
onMounted(async () => {
  // createAccount()
  getBalance(Account2)
})
</script>
<style scoped>
h1 {
  @apply text-[20px] text-red-500;
}
</style>
