<template>
  <div>
    <div>
      <h1 class="text-[20px] text-red-500">账户信息：</h1>
      <p class="my-[10px] break-words">地址：0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3</p>
      <p>余额：{{ count }}</p>
      <van-divider></van-divider>

      <h1 class="text-[20px] text-red-500">转账操作：</h1>
      <van-button @click="send" type="primary" class="!my-[10px]">开始转账</van-button>
      <van-divider></van-divider>
    </div>
  </div>
</template>
<script setup lang="ts">
import Web3 from 'web3'
import { Account1, Account2, InfuraGoerliWsUrl } from '@/utils/consts'
// @ts-ignore
import Tx from 'ethereumjs-tx'
import { Buffer } from 'node:buffer'
import { Account1PK } from '@/utils/goerliPK'

const count = ref<string>('0')
const web3: Web3 = new Web3(Web3.givenProvider || InfuraGoerliWsUrl)
// 创建账户
const createAccount = () => {
  // const account = eth.accounts.create('kakLKASsdl@^&amsAd21asKDd0as^&*q23')
  // {
  //     "address": "0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3",
  //     "privateKey": "0x4d60e7d3aaf14f9b5462eeddb92d44ba2f496f0fc392765dfa96aeac955939a6"
  // }
}
// 余额获取
const getBalance = async (web3Instance: Web3, account: string) => {
  const balance = await web3Instance.eth.getBalance(
    // web3,
    // '0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3',
    account
    // web3.defaultBlock,
    // DEFAULT_RETURN_FORMAT
    // ETH_DATA_FORMAT
  )

  console.log(
    'balance: ',
    balance,
    web3.utils.toWei(balance, 'wei'),
    web3.utils.fromWei(balance, 'ether')
  )
  count.value = balance
}
// eth转账
const send = async () => {
  console.log('send')
  // 1.构建转账参数
  // 获此账户交易次数
  const nonce = await web3.eth.getTransactionCount(
    // web3,
    Account1
    // web3.defaultBlock,
    // DEFAULT_RETURN_FORMAT
  )
  console.log('nonce: ', nonce)
  // 获取预计的转账gas费
  // const gasPrice = await eth.getGasPrice(web3, DEFAULT_RETURN_FORMAT)
  const gasPrice = await web3.eth.getGasPrice()

  console.log('gasPrice: ', gasPrice, web3.utils.fromWei(gasPrice, 'ether'))
  // 转账金额：以wei为单位
  const value = web3.utils.toWei('0.01', 'ether')
  console.log('value: ', value)
  // 构建原始数据
  const rawTx = {
    gas: 0, // 后续计算
    from: Account1,
    to: Account2,
    nonce,
    gasPrice,
    value,
    data: '0x0000'
  }
  // 2. 生成序列化数据
  // 私钥转化
  const privateKey = Buffer.from(Account1PK.slice(2), 'hex')
  console.log('privateKey', privateKey)
  // gas估算
  const gas = await web3.eth.estimateGas(
    // web3,
    rawTx
    //  web3.defaultBlock, DEFAULT_RETURN_FORMAT
  )
  console.log('gas', gas)
  rawTx.gas = gas
  // ethereumjs-tx 私钥加密
  const tx = new Tx(rawTx)
  console.log('tx1: ', tx)

  tx.sign(privateKey)
  // 生成序列化tx
  const serializedTx = `0x${tx.serialize().toString('hex')}`
  console.log('serializedTx', serializedTx)
  // 3. 开始转账
  const trans = web3.eth.sendSignedTransaction(serializedTx)
  trans.on('transactionHash', (txid) => {
    console.log('交易id: ', txid)
  })
  // 第一个节点确认
  trans.on('receipt', (res) => {
    console.log('第一个节点确认receipt:', res)
    getBalance(web3, Account1)
  })
  // 每一个节点确认
  trans.on('confirmation', (res) => {
    console.log('有节点确认confirmation:', res)
    // getBalance(Account1)
  })
}
onMounted(async () => {
  // createAccount()
  getBalance(web3, Account1)
})
</script>
<style scoped lang="less"></style>
