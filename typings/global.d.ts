declare interface Window {
  ethereum: any
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any
    get: (key: string) => unkonwn | undefined
    set: (key: string, val: unknown) => void
    remove: (key: string) => void
    clear: () => void
  }
}

declare type TWalletInfo = {
  id: number
  address: string
  checkAddress: string
  privateKey: string
  keystore: V3Keystore
  mnemonic: string
  balance: number
  password: string
}

declare type TCoinInfo = {
  name: string
  symbol: string
  balanceOf: number
  totalSupply: string
}
