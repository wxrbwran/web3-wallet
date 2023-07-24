import Web3 from 'web3'
import { Buffer } from 'node:buffer'
//@ts-ignore
import Tx from 'ethereumjs-tx'
import { error } from 'node:console'
import { showToast } from 'vant'

export const getPrivateKeyByWeb3KeyStore = (web3: Web3, keystore: any, password: string) => {
  // 1. web3.js方法
  try {
    const pkByWeb3JS = web3.eth.accounts.decrypt(keystore, password)
    return pkByWeb3JS.privateKey
  } catch (e) {
    showToast({
      type: 'fail',
      message: 'keystore或者密码错误。'
    })
    return ''
  }
}

// eth转账
export const transfer = (
  web3: Web3,
  fromAccount: string,
  toAccount: string,
  fromAccountPK: string
) => {
  return new Promise((resolve, reject) => {
    // 1.构建转账参数
    // 获此账户交易次数
    web3.eth
      .getTransactionCount(
        // web3,
        fromAccount
        // web3.defaultBlock,
        // DEFAULT_RETURN_FORMAT
      )
      .then((nonce) => {
        console.log('nonce: ', nonce)
        // 获取预计的转账gas费
        // const gasPrice = await eth.getGasPrice(web3, DEFAULT_RETURN_FORMAT)
        web3.eth.getGasPrice().then((gasPrice) => {
          // console.log('gasPrice: ', gasPrice, web3.utils.fromWei(gasPrice, 'ether'))
          // 转账金额：以wei为单位
          const value = web3.utils.toWei('0.001', 'ether')
          // console.log('value: ', value)
          // 构建原始数据
          const rawTx = {
            gas: 0, // 后续计算
            from: fromAccount,
            to: toAccount,
            nonce,
            gasPrice,
            value,
            data: '0x0000'
          }
          // 2. 生成序列化数据
          // 私钥转化
          const privateKey = Buffer.from(fromAccountPK.slice(2), 'hex')
          console.log('privateKey', privateKey)
          // gas估算
          web3.eth
            .estimateGas(
              // web3,
              rawTx
              //  web3.defaultBlock, DEFAULT_RETURN_FORMAT
            )
            .then((gas) => {
              // console.log('gas', gas)
              rawTx.gas = gas
              // ethereumjs-tx 私钥加密
              const tx = new Tx(rawTx)
              // console.log('tx1: ', tx)

              tx.sign(privateKey)
              // 生成序列化tx
              const serializedTx = `0x${tx.serialize().toString('hex')}`
              // console.log('serializedTx', serializedTx)
              // 3. 开始转账
              const trans = web3.eth.sendSignedTransaction(serializedTx)
              trans.on('transactionHash', (txid) => {
                console.log('交易id: ', txid)
                resolve(txid)
              })
              // 第一个节点确认
              trans.on('receipt', (res) => {
                console.log('第一个节点确认receipt:', res)
                // getBalance(web3, Account1)
              })
              // trans.on('error', (res) => {
              //   console.log('trans error:', res)
              //   reject(res)
              // })
              // 每一个节点确认
              // trans.on('confirmation', (res) => {
              //   console.log('有节点确认confirmation:', res)
              //   // getBalance(Account1)
              // })
            })
        })
      })
  })
}
