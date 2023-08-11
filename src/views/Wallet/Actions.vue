<template>
  <van-space>
    <InputPassword @onSuccess="onSuccess" btn-text="创建钱包"></InputPassword>
    <InputPassword
      v-if="!mnemonic"
      @onSuccess="onSuccessImport"
      show-mnemonic
      btn-text="导入钱包"
    ></InputPassword>
    <ImportWallet
      v-if="mnemonic"
      :mnemonic="mnemonic"
      @onSuccess="onSuccessPK"
      btn-text="导入钱包"
    ></ImportWallet>
    <!-- <van-button type="primary">导入钱包</van-button> -->
  </van-space>
  <van-divider></van-divider>

  <div v-show="openMnemonic">
    <van-field type="textarea" class="mb-[10px]" v-model="mnemonic"></van-field>
    <SaveMnemonic :mnemonic="mnemonic" @onSave="onSave"></SaveMnemonic>
  </div>
</template>
<script setup lang="ts">
import { useWalletStore } from '@/stores/useWalletStore'
import InputPassword from '@/components/dialog/input-password.vue'
import ImportWallet from '@/components/dialog/import-wallet.vue'

import SaveMnemonic from '@/components/dialog/save-mnemonic.vue'
import { DerivePath, WalletInfoStorageKey } from '@/utils/consts'
import { showToast } from 'vant'
import useEthers from '@/hooks/useEthers'

const { ethers } = useEthers()

const emits = defineEmits(['onCreateAccount'])

const walletInfoLocal = window.$storage.get(WalletInfoStorageKey) || []

const password = ref<string>('')
const mnemonic = ref<string>(walletInfoLocal?.[0]?.mnemonic ?? '')
const openMnemonic = ref<boolean>(false)
const walletStore = useWalletStore()

const onSuccess = ({ p }: { p: string }) => {
  const walletInfo = window.$storage.get(WalletInfoStorageKey)
  const val =
    // walletInfo?.[0]?.mnemonic || ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32))
    walletInfo?.[0]?.mnemonic || ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))

  // console.log('mnemonic', mnemonic)
  mnemonic.value = val
  password.value = p
  if (walletInfoLocal.length === 0) {
    openMnemonic.value = true
  } else {
    onSave()
  }
}
const onSuccessImport = ({ p, m }: { p: string; m: string }) => {
  mnemonic.value = m
  password.value = p
  onSave()
}
const onSuccessPK = () => {
  console.log('onSuccessPK')
  // emits('onCreateAccount')
  // 此处由 account-list组件中 watch store 触发
}
const onSave = async () => {
  // console.log('onSave ok')
  const addressIndex = walletInfoLocal?.length || 0
  const toast = showToast({ type: 'loading', message: '正在保存钱包信息', duration: 0 })
  // const seed = await bip39.mnemonicToSeed(mnemonic.value)
  const hdWallet = ethers.utils.HDNode.fromMnemonic(mnemonic.value)
  // console.log('hdWallet', hdWallet)
  // m/purpse'/coin_type'/account'/change/address_index
  const hdNodeNew = hdWallet.derivePath(`${DerivePath}${addressIndex}`)
  // console.log('keypair', keypair)
  const wallet = new ethers.Wallet(hdNodeNew.privateKey)
  // console.log('wallet', wallet)
  // 获取钱包地址
  const lowerCaseAddress = await wallet.getAddress()
  console.log('lowerCaseAddress', lowerCaseAddress)

  // 获取私钥
  const privateKey = wallet.privateKey
  // cash view uncle proud side entry drama indicate pride one face inmate future update upon crisp tank document author virus aunt cupboard effort innocent
  // 0xc9249e9ab0482eb37d9f77d9a3402e386f6d3e0071d9737ede36e646348fc527
  // 生成keystore
  // const keystore = await wallet.toV3(password.value) // 太慢
  // const keystore = web3.eth.accounts.encrypt(privateKey, password.value) // json对象
  // const keystore = await generateKeystore(privateKey, password.value) // json字符串
  const keystore = await wallet.encrypt(password.value)
  const walletInfo: TWalletInfo[] = [
    ...walletInfoLocal,
    {
      id: addressIndex,
      address: lowerCaseAddress,
      balance: 0,
      // 下面数据，实际必须由用户自己存储
      mnemonic: mnemonic.value,
      privateKey,
      password: password.value,
      keystore
    }
  ]
  console.log('walletInfo', walletInfo)
  window.$storage.set(WalletInfoStorageKey, walletInfo)
  walletStore.saveInfo(walletInfo)
  toast.close()
  emits('onCreateAccount')
  openMnemonic.value = false
}
</script>
<style scoped lang="less"></style>
