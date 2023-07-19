<template>
  <div class="p-[10px]" @click="handleClick">erc20</div>
</template>

<script setup lang="ts">
import Web3 from 'web3'
import qtumContractJSON from '@/contracts/Qutm.json'
import { AbiItem } from 'web3-utils'

const { proxy } = getCurrentInstance() as any
const web3: Web3 = proxy.web3
const contract = ref()
const coinInfo = reactive<TCoinInfo>({
  name: '',
  symbol: '',
  balanceOf: 0,
  totalSupply: ''
})

const initContract = async () => {
  const qtumContract = new web3.eth.Contract(
    qtumContractJSON.abi as AbiItem,
    '0xEc20Ff7B90ecf57BBef561a2b56124cC370bF32a'
  )
  contract.value = qtumContract
  // console.log('qtumContract', qtumContract)
}

// 获取代币信息
const getCoinInfo = async () => {
  // const account = await web3.eth.requestAccounts()
  // console.log('account', account)
  contract.value
}

onMounted(async () => {
  await initContract()
  await getCoinInfo()
})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
