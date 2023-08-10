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
import { CoinInfoMap } from '@/utils/consts'
import BottomNote from '@/components/bottom-note.vue'
import { showLoadingToast, showToast } from 'vant'
import useEthers from '@/hooks/useEthers'

const { provider, QutmContract, ethers } = useEthers()

const toAddress = ref<string>('0x8F9a5caeD0802b3D58c4B54a41f79068CE09B87E')
const count = ref<number>()
const currentAccount = ref<string>('')
const sending = ref<boolean>(false)

const data = reactive<{
  coinInfo: TCoinInfo
  finished: boolean
  loading: boolean
  signer: JsonRpcSigner
}>({
  loading: false,
  finished: false,
  signer: null,
  coinInfo: {
    name: '',
    symbol: '',
    balanceOf: 0,
    currentAccount: '',
    totalSupply: ''
  }
})

// 获取代币信息
const getCoinInfo = async () => {
  data.loading = true
  const curSigner = await provider.getSigner()
  data.signer = curSigner
  currentAccount.value = await curSigner.getAddress()

  const name = await QutmContract.name()

  const symbol = await QutmContract.symbol()

  const totalSupply = await QutmContract.totalSupply()

  const balanceOf = await QutmContract.balanceOf(currentAccount.value)

  data.coinInfo = {
    name,
    symbol,
    totalSupply: ethers.utils.formatEther(totalSupply),
    // totalSupply,
    currentAccount: currentAccount.value,
    // balanceOf
    balanceOf: ethers.utils.formatEther(balanceOf)
  }
  // console.log('coinInfo', data.coinInfo)

  data.loading = false
  data.finished = true

  // console.log('coinInfo', data.coinInfo)
}
// 转账
const handleTransfer = async () => {
  sending.value = true
  // console.log('handleTransfer', toAddress.value, count.value)
  const weiCount = ethers.utils.parseEther(`${count.value}`)
  // console.log('handleTransfer', weiCount)
  const loadingToast = showLoadingToast({ duration: 0, message: '正在转账' })
  console.log('contract', QutmContract)
  // console.log('data', toRaw(data.signer))
  const contractWithSigner = QutmContract.connect(toRaw(data.signer))
  // console.log('contractWithSigner', contractWithSigner)
  try {
    const tx = await contractWithSigner.transfer(toAddress.value, weiCount)
    await tx.wait()
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
  } catch (err: any) {
    loadingToast.close()
    sending.value = false
    // console.log(err.message)
    showToast({
      type: 'fail',
      message: err.message
    })
  }

  // .on('receipt', () => {
  //   loadingToast.close()
  //   sending.value = false
  //   toAddress.value = ''
  //   count.value = undefined
  //   // console.log('交易成功')
  //   showToast({
  //     type: 'success',
  //     message: '交易成功'
  //   })
  //   getCoinInfo()
  // })
  // .on('error', (err: any) => {
  //   loadingToast.close()
  //   sending.value = false
  //   // console.log(err.message)
  //   showToast({
  //     type: 'fail',
  //     message: err.message
  //   })
  // })
}

onMounted(async () => {
  // await initContract()
  await getCoinInfo()
})

const handleClick = () => {
  // router.push({ name: 'detail' })
}
</script>
