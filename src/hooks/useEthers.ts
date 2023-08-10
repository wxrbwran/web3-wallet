import { GanacheUIHttpUrl, VoteContractAddress, QutmContractAddress } from '@/utils/consts'
import VoteContractJSON from '@/contracts/Vote.json'
import QutmContractJSON from '@/contracts/Qutm.json'

import { ethers } from 'ethers'

const useEthers = () => {
  // const provider = new ethers.providers.JsonRpcProvider(GanacheUIHttpUrl)
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  // console.log('provider', provider)

  const VoteContract: any = new ethers.Contract(VoteContractAddress, VoteContractJSON.abi, provider)
  // console.log('VoteContract', VoteContract)

  const QutmContract: any = new ethers.Contract(QutmContractAddress, QutmContractJSON.abi, provider)
  // console.log('QutmContract', QutmContract)

  const getSigner = async () => {
    const curSigner = await provider.getSigner()
    return curSigner
  }

  return {
    ethers,
    provider,
    VoteContract,
    QutmContract,
    getSigner
    // getAccount
  }
}

export default useEthers
