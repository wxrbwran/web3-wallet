<template>
  <div class="home-content">
    <div class="p-[10px]" @click="handleClick">
      <div>Qtum基本信息</div>
      <van-divider></van-divider>
      <van-list
        loading-text="正在加载代币信息"
        v-model:loading="data.loading"
        :finished="data.finished"
      >
        <van-cell
          v-for="item in Object.keys(data.coinInfo)"
          :key="item"
          :title="CoinInfoMap[item]"
          :title-style="{ flex: '0 0 20%' }"
          value-class="hover:(font-balck text-(red-500 [16px]))"
          :value="data.coinInfo[item as TCoinInfoKey]"
        />
      </van-list>
      <div class="mt-[10px]">
        <div>转账操作</div>
        <van-form @submit="handleTransfer">
          <van-row class="space-y-[10px] flex justify-center">
            <van-field
              placeholder="转出地址"
              v-model="toAddress"
              :rules="[
                { required: true, message: '请填写转出账户' },
                {
                  validator: (value) => value.startsWith('0x') && value.length === 42,
                  message: '转出账户地址格式错误'
                }
              ]"
            ></van-field>
            <van-field
              placeholder="转出金额"
              v-model="count"
              type="number"
              :rules="[
                { required: true, message: '请填写转出金额' },
                {
                  validator: (value) => value > 0,
                  message: '转出金额应大于0'
                }
              ]"
            >
              <template #right-icon>
                <span>qtum</span>
              </template>
            </van-field>
            <van-button
              :disabled="sending"
              type="primary"
              size="small"
              class="w-[80px]"
              native-type="submit"
            >
              开始转账
            </van-button>
          </van-row>
        </van-form>
      </div>
    </div>
    <BottomNote></BottomNote>
  </div>
</template>

<script setup lang="ts">
import Web3 from 'web3'
import QtumContractJSON from '@/contracts/Qutm.json'
import { CoinInfoMap } from '@/utils/consts'
import BottomNote from '@/components/bottom-note.vue'
import { showLoadingToast, showToast } from 'vant'

const { proxy } = getCurrentInstance() as any
const web3: Web3 = proxy.web3
const contract = ref()

const toAddress = ref<string>('0xbC1b6866204241EcDbc94071717a8043082Bfc2E')
const count = ref<number>()
const currentAccount = ref<string>('')
const sending = ref<boolean>(false)

const data = reactive<{ coinInfo: TCoinInfo; finished: boolean; loading: boolean }>({
  loading: false,
  finished: false,
  coinInfo: {
    name: '',
    symbol: '',
    balanceOf: 0,
    currentAccount: '',
    totalSupply: ''
  }
})

const initContract = async () => {
  const qtumContract = new web3.eth.Contract(
    QtumContractJSON.abi as any,
    // 部署地址
    // '0xEc20Ff7B90ecf57BBef561a2b56124cC370bF32a' // goerli
    '0x3e1A0F6aB4038Ce4742155263644c1c3DdE531fa' // ganache
  )
  contract.value = qtumContract
  // console.log('qtumContract', qtumContract)
}

// 获取代币信息
const getCoinInfo = async () => {
  data.loading = true
  const account = await web3.eth.requestAccounts()
  currentAccount.value = account[0]
  const methods = await contract.value.methods
  const name = await methods.name().call()
  const symbol = await methods.symbol().call()
  const totalSupply = await methods.totalSupply().call()
  const balanceOf = await methods.balanceOf(account[0]).call()
  data.coinInfo = {
    name,
    symbol,
    totalSupply: web3.utils.fromWei(totalSupply, 'ether'),
    // totalSupply,
    currentAccount: account[0],
    // balanceOf
    balanceOf: web3.utils.fromWei(balanceOf, 'ether')
  }
  data.loading = false
  data.finished = true

  // console.log('coinInfo', data.coinInfo)
}
// 转账
const handleTransfer = async () => {
  sending.value = true
  // console.log('handleTransfer', toAddress.value, count.value)
  const weiCount = web3.utils.toWei(`${count.value}`, 'ether')
  // console.log('handleTransfer', weiCount)
  const loadingToast = showLoadingToast({ duration: 0, message: '正在转账' })
  contract.value.methods
    .transfer(toAddress.value, weiCount)
    .send({
      from: currentAccount.value
    })
    .on('receipt', () => {
      loadingToast.close()
      sending.value = false
      toAddress.value = ''
      count.value = undefined
      // console.log('交易成功')
      showToast({
        type: 'success',
        message: '交易成功'
      })
      getCoinInfo()
    })
    .on('error', (err: any) => {
      loadingToast.close()
      sending.value = false
      // console.log(err.message)
      showToast({
        type: 'fail',
        message: err.message
      })
    })
}

onMounted(async () => {
  await initContract()
  await getCoinInfo()
})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
