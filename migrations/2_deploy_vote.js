// const ExchangeContracts = artifacts.require('Exchange.sol')
const VoteContracts = artifacts.require('Vote.sol')

// const Contracts = actifacts.require("StudentStorage.sol");

module.exports = async function (deployer, network, accounts) {
  // promise 部署出错
  // const accounts = await web3.eth.getAccounts();
  console.log('network', network)

  // console.log('accounts', accounts, accounts[0]);
  // deployer.deploy(ExchangeContracts, accounts[0], 10)
  deployer.deploy(VoteContracts, ['刘能', '谢广坤', '赵四'])

  // 0x8F27f785238CB38096fBc7E1E20c33E24dc4bEbf
}
