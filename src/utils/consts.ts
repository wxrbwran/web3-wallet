export const Account1 = '0xbC1b6866204241EcDbc94071717a8043082Bfc2E'

export const Account2 = '0x59e19bfae42C786c5eC4EF0abe68f64707D02C6f'

export const Account3 = '0xBb9429df9151ba6c88dC3e163403aC7Ed33354E3'

export const InfuraGoerliWsUrl = 'wss://goerli.infura.io/ws/v3/c716104bdaa8452cbc8cb522c00c8f10'
export const GanacheWsUrl = 'ws://127.0.0.1:8545'

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
