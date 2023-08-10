export const Account1 = '0x7993ec51D75c790ce10837c3195E6605B90Bf8Bd'

export const Account2 = '0x8F9a5caeD0802b3D58c4B54a41f79068CE09B87E'

export const Account3 = '0x27de8Cbb4B56FcD1aa40a82E43FAe413E0eB908e'

export const InfuraGoerliWsUrl = 'wss://goerli.infura.io/ws/v3/c716104bdaa8452cbc8cb522c00c8f10'
export const GanacheWsUrl = 'ws://127.0.0.1:8545'
export const GanacheUIHttpUrl = 'http://127.0.0.1:7545'

export const DerivePath = `m/44'/60'/0'/0/`

export const WalletInfoStorageKey = 'wallet-info'

export const CoinInfoMap: Record<string, string> = {
  name: '名称',
  symbol: '标识',
  totalSupply: '总发行量',
  currentAccount: '当前账户',
  balanceOf: '持有数量'
}
export const AccountInfoMap: Record<string, string> = {
  account: '当前账户',
  amount: '账户票数',
  delegator: '委托账户',
  isVoted: '是否已投票',
  targetId: '投票目标'

  // amount: '',
  //   delegator: '',
  //   isVoted: '',
  //   targetId: ''
}

export const QutmContractAddress = '0xDa3bAFC33F3b6Bf5f509F8C2880c5A0142d6E51e'
export const VoteContractAddress = '0x3DC80ac0c7d3Fd6E6d6d0360a0975F55d90025E8'
