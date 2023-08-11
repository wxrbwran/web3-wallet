<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { GanacheUIHttpUrl } from '@/utils/consts'
import { ethers } from 'ethers'
import QutmJson from '@/contracts/Qutm.json'
import { onMounted } from 'vue'

const QutmAbi = QutmJson.abi
const QutmAddress = '0x6e19bb622c11484d54bCe55F1C81031E344E3aB3'

const provider = new ethers.providers.JsonRpcProvider(GanacheUIHttpUrl)
const test = async () => {
  const accounts = await provider.send('eth_accounts', [])
  console.log('accounts', accounts)

  // 获取登陆账号
  const signer = await provider.getSigner()
  console.log('signer', signer)

  // 获取账号地址
  const address = await signer.getAddress()
  console.log('address', address)

  // 1. 查询vitalik在Goerli测试网的ETH余额
  const balanceGoerli = await provider.getBalance(`0x7993ec51D75c790ce10837c3195E6605B90Bf8Bd`)
  console.log(`Balance: ${ethers.utils.formatEther(balanceGoerli)} ETH`)

  // 2. 查询provider连接到了哪条链
  const network = await provider.getNetwork()
  console.log('network', network)

  // 3. 查询区块高度
  console.log('\n3. 查询区块高度')
  const blockNumber = await provider.getBlockNumber()
  console.log('blockNumber', blockNumber)

  // 4. 查询当前gas price
  console.log('\n4. 查询当前gas price')
  const gasPrice = await provider.getFeeData()
  console.log('gasPrice', gasPrice)

  // 6. 查询区块信息
  console.log('\n6. 查询区块信息')
  const block = await provider.getBlock(0)
  console.log(block)
  // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
  console.log('\n7. 给定合约地址查询合约bytecode，例子用的WETH地址')
  const code = await provider.getCode('0xc778417e063141139fce010982780140aa0cd5ab')
  console.log(code)

  const QutmContract = new ethers.Contract(QutmAddress, QutmAbi, provider)

  const name = await QutmContract.name()
  console.log('QutmContract name', name)

  const symbol = await QutmContract.symbol()
  console.log('QutmContract symbol', symbol)

  const totalSupply = await QutmContract.totalSupply()
  console.log('QutmContract totalSupply', totalSupply)
  const balance = await QutmContract.balanceOf('0x7993ec51D75c790ce10837c3195E6605B90Bf8Bd')
  console.log(`account1持仓: ${ethers.utils.formatEther(balance)}\n`)

  // 创建随机的wallet对象

  const wallet1 = ethers.Wallet.createRandom()
  console.log('wallet1', wallet1)

  // 用私钥创建wallet对象
  const wallet2 = new ethers.Wallet(
    '0xda20ea43a66dfa2d09ca25112e94f58f19907e957697d5cfaaba4ad0e4b4cc32',
    provider
  )
  console.log('wallet2', wallet2)

  // 从助记词创建wallet对象
  // 从助记词创建wallet对象
  const m = 'wine soda grant pool online scrap ramp nothing armor resemble tent slight'
  const wallet3 = ethers.Wallet.fromMnemonic(m, `m/44'/60'/0'/0/0`)
  console.log('wallet3', wallet3)

  // 通过JSON文件创建wallet对象
  // ethers.Wallet.fromEncryptedJson

  const address1 = await wallet1.getAddress()
  const address2 = await wallet2.getAddress()
  const address3 = await wallet3.getAddress() // 获取地址
  console.log(`1. 获取钱包地址`)
  console.log(`钱包1地址: ${address1}`)
  console.log(`钱包2地址: ${address2}`)
  console.log(`钱包3地址: ${address3}`)
  console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`)
  console.log(`钱包3助记词: ${wallet3.mnemonic?.phrase}`)
  console.log(`钱包2私钥: ${wallet2.privateKey}`)

  const txCount2 = await provider.getTransactionCount(wallet2.address)
  const txCount3 = await provider.getTransactionCount(wallet3.address)
  console.log(`钱包2发送交易次数: ${txCount2}`)
  console.log(`钱包3发送交易次数: ${txCount3}`)

  // 5. 发送ETH
  console.log(`i. 发送前余额`)
  console.log(`钱包2: ${ethers.utils.formatEther(await provider.getBalance(wallet2.address))} ETH`)
  console.log(`钱包3: ${ethers.utils.formatEther(await provider.getBalance(wallet3.address))} ETH`)

  const tx = {
    to: wallet2.address,
    value: ethers.utils.parseEther('0.1')
  }

  // iii. 发送交易，获得收据
  console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
  // const receipt = await signer.sendTransaction(tx)
  // await receipt.wait() // 等待链上确认交易
  // console.log(receipt) // 打印交易详情
}
const testContracts = async () => {
  // 从助记词创建wallet对象
  // 从助记词创建wallet对象
  const m = 'wine soda grant pool online scrap ramp nothing armor resemble tent slight'
  const wallet3 = ethers.Wallet.fromMnemonic(m, `m/44'/60'/0'/0/0`)
  const signer = await provider.getSigner()

  const contract = new ethers.Contract(
    '0x6e19bb622c11484d54bCe55F1C81031E344E3aB3',
    QutmAbi,
    signer
  )
  console.log('contract', contract)
  console.log('signer', signer, signer.getAddress())
  const address = await signer.getAddress()
  console.log('address', address)

  const balanceQutm = await contract.balanceOf(address)
  console.log(`token持仓: ${ethers.utils.formatEther(balanceQutm)}\n`)
  const tx = await contract.transfer(
    '0x27de8Cbb4B56FcD1aa40a82E43FAe413E0eB908e',
    ethers.utils.parseEther('10')
  )
  await tx.wait()
  const balance_transfer = await contract.balanceOf(address)
  console.log(`转账后signer持仓: ${ethers.utils.formatEther(balance_transfer)}\n`)
}
onMounted(() => {
  test()
  testContracts()
})
</script>

<template>
  <main>
    111
    <!-- <TheWelcome /> -->
  </main>
</template>
