### 转账

#### 一旦又了钱包，我们就可以向其他人发起转账交易。

创建一个 tx 对象，它最少需要两个属性，to 和 value，分别表示接受钱包地址和转账额度。
然后使用 wallet.sendTransaction 方法发送转账，它会返回一个 receipt 对象。这个对象有一个异步的 wait 方法，当交易上链后会返回。

```javascript
const tx = {
  to: address,
  value: ethers.utils.parseEther('0.1')
}

console.log('开始转账')
const receipt = await wallet.sendTransaction(tx)
await receipt.wait()
console.log('完成转账')
```

#### 通过合约转账交易

交易需要使用 Wallet 对象。再通过 wallet 作为合约的第三个构造参数创建 Contract 对象。
调用合约的 transfer 方法，进行转账交易。该方法需要两个参数，转入的钱包地址字符串和转入的数量。
transfer 会返回一个 tx 对象，该对象有一个异步的 wait 方法，会在交易完成后执行。

```javascript
const wallet = new ethers.Wallet(privateKey, provider)

const contract = new ethers.Contract(contractAddress, abi, wallet)(async () => {
  const tx = await contract.transfer(toAddress, ethers.utils.parseEther('1'))
  await tx.wait()
})()
```

#### 通过 signer 进行转账

通常我们无法直接拿到 privateKey，但是可以通过 signer 对象间接使用 privateKey。只需要进行签名就可以进行交易。这也是最常用的交易方式。

```javascript
const signer = walletProvider.getSigner()
const tx = {
  to,
  value
}
const receipt = await signer.sendTransaction(tx)
await receipt.wait()
```

### 部署智能合约

#### 要在 Web3 中部署一个智能合约，我们要写。

```javascript
const web3 = new Web3(/_ your provider _/)

async function main() {
  let accounts = await web3.eth.getAccounts()
  let contract = new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object })
    .send({ from: accounts[0], gas: '1000000' })
  console.log(contract.address)
}
```

main();

#### 而对于以太坊，我们可以用以下方式进行部署。

```javascript
async function main() {
  const signer = new ethers.providers.Web3Provider(/_ your provider _/).getSigner()
  const contractFactory = new ethers.ContractFactory(abi, bytecode.object, signer)
  const contract = await contractFactory.deploy()
  console.log(contract.address)
}

main()
```

### 与已部署的合约互动

#### 为了使用 web3 与这个部署的合同进行交互，我们写道。

```javascript
const contract = new web3.eth.Contract(abi, contractAddress)
console.log(await contract.methods.message().call())
await contract.methods.setMessage('This is Chigozie').send({ from: accounts[0], gas: '1000000' })
console.log(await contract.methods.message().call())
```

#### 而我们使用 Ethers 进行交互，比如。

```javascript
const contract = new ethers.Contract(contractAddress, abi, signer)
console.log(await contract.message())
await contract.setMessage('This is Chigozie')
console.log(await contract.message())
```

### 发送交易

#### 要使用 Web3 做到这一点，我们要写这样的东西。

```javascript
const web3 = new Web3(/_ provider _/)

let receiver = /_ receiver address _/
let sender = (await web3.eth.getAccounts())[0]

let receipt = await web3.eth.sendTransaction({
  to: receiver,
  value: '1000000',
  from: sender
})
```

#### 而用以太坊做同样的事情，我们的代码将看起来像这样。

```javascript
let receiver = /_ receiver's address _/

let sender = new ethers.providers.Web3Provider(/_ your provider _/).getSigner()

let receipt = await sender.sendTransaction({
  to: receiver,
  value: 100000000000n
})
```

### 事件

```javascript
daiContract.on("Transfer", (from, to, amount, event) => {
    console.log(`${ from } sent ${ formatEther(amount) } to ${ to}`);
    // 事件对象包含逐字记录数据、EventFragment 和获取块、交易和接收的函数以及事件函数
});
​
// @Todo: I don't know if Can I get all transactions here.
// A filter for when a specific address receives tokens
myAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";
filter = daiContract.filters.Transfer(null, myAddress)
// {
//  address: 'dai.tokens.ethers.eth',
//  topics: [
//    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//    null,
//    '0x0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72'
//  ]
// }
​
// Receive an event when that filter occurs
daiContract.on(filter, (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${ formatEther(amount) } from ${ from }.`);
});
```
