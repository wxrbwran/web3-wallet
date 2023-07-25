<template>
  <div>
    <van-button :type="btnType || 'primary'" @click="open">{{ btnText }}</van-button>
    <van-dialog
      v-model:show="show"
      title="请输入私钥"
      show-cancel-button
      @confirm="onSubmit"
      @cancel="onCancel"
      :before-close="beforeClose"
      :cancel-button-disabled="!privateKey"
    >
      <van-field
        v-model="privateKey"
        type="password"
        name="privateKey"
        label="私钥"
        placeholder="私钥,不包含0x"
      />
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { WalletInfoStorageKey } from '@/utils/consts'
import Wallet from 'ethereumjs-wallet'
import { ButtonType } from 'vant'
import { useWalletStore } from '@/stores/useWalletStore'
import { Buffer } from 'node:buffer'

const props = defineProps<{
  btnText: string
  btnType?: ButtonType
  mnemonic: string
}>()

const emits = defineEmits(['onSuccess'])

const show = ref<boolean>(false)
const privateKey = ref<string>('')
const walletStore = useWalletStore()
const beforeClose = () => {
  // console.log('beforeClose')
  // return false
}

// 通过私钥获取地址
const getAddressByPrivate = (pk: string) => {
  const privatekey2 = Buffer.from(pk, 'hex')
  const wallet = Wallet.fromPrivateKey(privatekey2)
  const lowerCaseAddress = wallet.getAddressString()
  const checkAddress = wallet.getChecksumAddressString()
  return {
    address: lowerCaseAddress,
    checkAddress
  }
}

const onSubmit = () => {
  const walletInfoLocal = window.$storage.get(WalletInfoStorageKey) || []
  const addresses = getAddressByPrivate(privateKey.value)
  console.log('addresses', addresses)
  const walletInfo: TWalletInfo[] = [
    ...walletInfoLocal,
    {
      id: walletInfoLocal.length || 0,
      address: addresses.address,
      checkAddress: addresses.checkAddress,
      balance: 0,
      // 下面数据，实际必须由用户自己存储
      mnemonic: props.mnemonic,
      privateKey
    }
  ]
  // console.log('walletInfo', walletInfo)
  window.$storage.set(WalletInfoStorageKey, walletInfo)
  walletStore.saveInfo(walletInfo)
  emits('onSuccess')
  show.value = false
}
const onCancel = () => {
  show.value = false
  privateKey.value = ''
}
const open = async () => {
  // console.log('open')
  show.value = true
}
</script>
<style scoped lang="less"></style>
