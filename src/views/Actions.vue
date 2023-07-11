<template>
  <van-space>
    <InputPassword @onSuccess="onSuccess" btn-text="创建钱包"></InputPassword>
    <van-button type="primary">导入钱包</van-button>
  </van-space>
  <van-divider></van-divider>

  <div v-show="openMnemonic">
    <van-field type="textarea" class="mb-[10px]" v-model="mnemonic"></van-field>
    <SaveMnemonic :mnemonic="mnemonic" @onSave="onSave"></SaveMnemonic>
  </div>
</template>
<script setup lang="ts">
import { mnemonicToSeed } from 'bip39'
import Wallet, { hdkey } from 'ethereumjs-wallet'
import { useWalletStore } from '@/stores/useWalletStore'
import * as bip39 from 'bip39'

import InputPassword from '@/components/dialog/input-password.vue'
import SaveMnemonic from '@/components/dialog/save-mnemonic.vue'
import { DerivePath, WalletInfoStorageKey } from '@/utils/consts'
import { showToast } from 'vant'

const emits = defineEmits(['onCreateAccount'])

const password = ref<string>('')
const mnemonic = ref<string>('')
const openMnemonic = ref<boolean>(false)
const walletStore = useWalletStore()

const { proxy } = getCurrentInstance() as any
const walletInfoLocal = window.$storage.get(WalletInfoStorageKey) || []

const onSuccess = ({ p }: { p: string }) => {
  const walletInfo = window.$storage.get(WalletInfoStorageKey)
  const val = walletInfo?.[0]?.mnemonic || bip39.generateMnemonic()
  // console.log('mnemonic', mnemonic)
  mnemonic.value = val
  password.value = p
  if (walletInfoLocal.length === 0) {
    openMnemonic.value = true
  } else {
    onSave()
  }
}
const onSave = async () => {
  // console.log('onSave ok')
  const addressIndex = walletInfoLocal?.length || 0
  const toast = showToast({ type: 'loading', message: '正在保存钱包信息', duration: 0 })
  const seed = await mnemonicToSeed(mnemonic.value)
  const hdWallet = hdkey.fromMasterSeed(seed)
  // console.log('hdWallet', hdWallet)
  // m/purpse'/coin_type'/account'/change/address_index
  const keypair = hdWallet.derivePath(`${DerivePath}${addressIndex}`)
  // console.log('keypair', keypair)
  const wallet = keypair.getWallet()
  // console.log('wallet', wallet)
  // 获取钱包地址
  const lowerCaseAddress = wallet.getAddressString()
  // 获取钱包校验地址
  const checkAddress = wallet.getChecksumAddressString()
  // 获取私钥
  const privateKey = wallet.getPrivateKey().toString('hex')
  // 生成keystore
  // const keystore = await wallet.toV3(password.value) // 太慢
  const keystore = proxy?.web3.eth.accounts.encrypt(privateKey, password.value)
  const walletInfo: WalletInfo[] = [
    ...walletInfoLocal,
    {
      id: addressIndex,
      address: lowerCaseAddress,
      checkAddress,
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
