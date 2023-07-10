declare interface Window {
  $storage: {
    setType: (key: 'localStorage' | 'sessionStorage') => any
    get: (key: string) => unkonwn | undefined
    set: (key: string, val: unknown) => void
    remove: (key: string) => void
    clear: () => void
  }
}

declare type WalletInfo = {
  id: number
  address: string
  checkAddress: string
  privateKey: string
  keystore: V3Keystore
  mnemonic: string
  balance: number
  password: string
}
