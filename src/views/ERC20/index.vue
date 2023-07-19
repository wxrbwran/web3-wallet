<template>
  <div class="p-[10px]" @click="handleClick">
    <div>Qtum信息</div>
    <van-list
      loading-text="正在加载代币信息"
      v-model:loading="data.loading"
      :finished="data.finished"
      finished-text="没有更多了"
    >
      <van-cell
        v-for="item in Object.keys(data.coinInfo)"
        :key="item"
        :title="item"
        :value="data.coinInfo[item]"
      />
    </van-list>
  </div>
</template>

<script setup lang="ts">
import Web3 from 'web3'
import qtumContractJSON from '@/contracts/Qutm.json'
import { AbiItem } from 'web3-utils'

const { proxy } = getCurrentInstance() as any
const web3: Web3 = proxy.web3
const contract = ref()
const data = reactive<{ coinInfo: TCoinInfo; finished: boolean; loading: boolean }>({
  loading: false,
  finished: false,
  coinInfo: {
    name: '',
    symbol: '',
    balanceOf: 0,
    totalSupply: ''
  }
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
  data.loading = true
  const account = await web3.eth.requestAccounts()
  console.log('account', account)
  const methods = await contract.value.methods
  const name = await methods.name().call()
  const symbol = await methods.symbol().call()
  const totalSupply = await methods.totalSupply().call()
  const balanceOf = await methods.balanceOf(account[0]).call()
  data.coinInfo = {
    name,
    symbol,
    totalSupply,
    balanceOf
  }
  data.loading = false
  data.finished = true

  console.log('coinInfo', data.coinInfo)
}

onMounted(async () => {
  await initContract()
  await getCoinInfo()
})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
