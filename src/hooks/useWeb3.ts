import { InfuraGoerliWsUrl } from '@/utils/consts'
import VoteContractJSON from '@/contracts/Vote.json'
import Web3 from 'web3'

const useWeb3 = () => {
  const web3 = new Web3(Web3.givenProvider || InfuraGoerliWsUrl)

  const VoteContract: any = new web3.eth.Contract(
    VoteContractJSON.abi as any,
    // '0xEc20Ff7B90ecf57BBef561a2b56124cC370bF32a'
    // 部署地址，ganache地址
    '0x8dBf898b932B6aDEe6D99f742A403D2fC9cfd14f'
  )
  console.log('VoteContract', VoteContract)

  const getAccount = async () => {
    const accounts = await web3.eth.requestAccounts()
    return accounts[0]
  }
  return {
    web3,
    VoteContract,
    getAccount
  }
}

export default useWeb3
