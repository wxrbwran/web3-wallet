<template>
  <div>
    <h1 class="text-red-500 text-2xl">助记词:</h1>
    <p>{{ mnemonic }}</p>
    <van-divider></van-divider>
  </div>
</template>
<script setup lang="ts">
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { hdkey } from 'ethereumjs-wallet'

const mnemonic = ref<string>(
  'swim road year machine symbol chaos immense during holiday urge disease angry'
)
// 创建助记词
const generate = () => {
  const letters = generateMnemonic()
  console.log('letters:', letters)
  mnemonic.value = letters
}
// 生成密钥对 keypair
const generateKeyPair = async () => {
  const seed = await mnemonicToSeed(mnemonic.value)
  const hdWallet = hdkey.fromMasterSeed(seed)
  console.log('hdWallet', hdWallet)
  // m/purpse'/coin_type'/account'/change/address_index
  const keypair = hdWallet.derivePath(`m/44'/60'/0'/0/0`)
  console.log('keypair', keypair)
  return keypair
}
// 获取私钥
const getPrivateKey = async () => {
  // 获取钱包对象
  const keypair = await generateKeyPair()
  const wallet = keypair.getWallet()
  console.log('wallet', wallet)
  // 获取钱包地址
  const lowerCaseAddress = wallet.getAddressString()
  console.log('lowerCaseAddress', lowerCaseAddress)
}
onMounted(() => {
  //   generate()
  // generateKeyPair()
  getPrivateKey()
})
</script>
<style scoped lang="less"></style>
