<template>
  <div>
    <h1 class="text-red-500 text-2xl">助记词:</h1>
    <p>{{ mnemonic }}</p>
    <van-divider></van-divider>
    <h1 class="text-red-500 text-2xl">路径:</h1>
    <p>{{ path }}</p>
    <van-divider></van-divider>
    <h1 class="text-red-500 text-2xl">账号地址:</h1>
    <p>0xecd81baa33fc821b6f47da0a7ab703dede6a6fcd</p>
    <van-divider></van-divider>
    <h1 class="text-red-500 text-2xl">账号私钥:</h1>
    <p>{{ privateKey }}</p>
    <van-divider></van-divider>
  </div>
</template>
<script setup lang="ts">
import { InfuraGoerliWsUrl, DerivePath } from '@/utils/consts'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import Wallet, { hdkey } from 'ethereumjs-wallet'
import Web3 from 'web3'
import { Buffer } from 'node:buffer'

const web3: Web3 = new Web3(Web3.givenProvider || InfuraGoerliWsUrl)

const mnemonic = ref<string>(
  'swim road year machine symbol chaos immense during holiday urge disease angry'
)

const path = ref<string>(DerivePath)
const privateKey = ref<string>('6c90d6469c49271db549084355d6b31ac8939389dbdab43209e4ed1b3325f581')
const data = reactive<{ wallet?: Wallet; keystoreByWeb3JS: any; keystoreByWallet: any }>({
  wallet: undefined,
  keystoreByWeb3JS: `{"version":3,"id":"7afdcb42-a189-4a19-b0ff-7b813d32eeaf","address":"ecd81baa33fc821b6f47da0a7ab703dede6a6fcd","crypto":{"ciphertext":"845c9b4d684f40b6fbaa6bafa9bf3b809677d1af4d14ff65e3458648ef9d289e","cipherparams":{"iv":"9ceea4003b939fcf23f48fcae69b9eeb"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"1800a15c09e23fe4048c90182dae763621292f21c15f2739160cde1523164450","n":8192,"r":8,"p":1},"mac":"423738baea94e1eb6a9b06b175235b2c958fbb5949e3b7637f67323a1ef53c80"}}`,
  keystoreByWallet: `{"version":3,"id":"d3a4474b-077a-4703-a93a-2affc25b4694","address":"ecd81baa33fc821b6f47da0a7ab703dede6a6fcd","crypto":{"ciphertext":"697a5634177ef6fcc9b1f241940d87ef9e7d7b2e9fd862905362dccf60e739c7","cipherparams":{"iv":"988f3eb425c1d932dd5739099030e9af"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"d76df118469e6e698f283bb8afd3be285a43c4ff2fc92a00a5c4052cfaf2df30","n":262144,"r":8,"p":1},"mac":"cb7837d8487fbc1888424d3f5ab0b87aa5004719f28c06e3512fdefb409c16e0"}}`
})
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
  const keypair = hdWallet.derivePath(path.value)
  console.log('keypair', keypair)
  return keypair
}
// 获取私钥
const getPrivateKey = async () => {
  // 获取钱包对象
  const keypair = await generateKeyPair()
  const wallet = keypair.getWallet()
  console.log('wallet', wallet)
  data.wallet = wallet
  // 获取钱包地址
  const lowerCaseAddress = wallet.getAddressString()
  console.log('lowerCaseAddress', lowerCaseAddress)
  // 获取钱包校验地址
  const checkAddress = wallet.getChecksumAddressString()
  console.log('checkAddress', checkAddress)
  // 获取私钥
  const privateKey = wallet.getPrivateKey().toString('hex')
  console.log('privateKey', privateKey)
  /**
   *
   *  lowerCaseAddress 0xecd81baa33fc821b6f47da0a7ab703dede6a6fcd
      checkAddress     0xecD81BaA33fc821b6F47da0A7ab703dEDE6A6fcd
      privateKey       6c90d6469c49271db549084355d6b31ac8939389dbdab43209e4ed1b3325f581
   */
}
// 导出keystore
const exportKeyStore = async () => {
  // 1. web3.js方法导出
  const keystoreByWeb3JS = web3.eth.accounts.encrypt(privateKey.value, 'mima')
  console.log('keystore', keystoreByWeb3JS, JSON.stringify(keystoreByWeb3JS))
  // 2. 使用钱包对象方法
  const keystoreByWallet = await data.wallet?.toV3('mima')
  console.log('keystoreByWallet', keystoreByWallet, JSON.stringify(keystoreByWallet))
}

const getPrivateKeyByKeyStore = async () => {
  // 1. web3.js方法
  const pkByWeb3JS = web3.eth.accounts.decrypt(JSON.parse(data.keystoreByWeb3JS), 'mima')
  console.log('pkByWeb3JS:', pkByWeb3JS)
  getAddressByPrivate(pkByWeb3JS.privateKey.slice(2))

  // 2. 使用钱包对象方法
  const pkByWallet = await Wallet.fromV3(JSON.parse(data.keystoreByWallet), 'mima')
  console.log('pkByWallet:', pkByWallet.getPrivateKey().toString('hex'))
}
// 通过私钥获取地址
const getAddressByPrivate = (pk: string) => {
  const privatekey2 = Buffer.from(pk, 'hex')
  console.log('privatekey2', privatekey2)
  const wallet2 = Wallet.fromPrivateKey(privatekey2)
  console.log('wallet2', wallet2)
  const lowerCaseAddress = wallet2.getAddressString()
  console.log('lowerCaseAddress', lowerCaseAddress)
}

onMounted(async () => {
  //   generate()
  // generateKeyPair()
  await getPrivateKey()
  // await exportKeyStore()
  await getPrivateKeyByKeyStore()
})
</script>
<style scoped>
p {
  word-break: break-all;
}
</style>
