import { defineStore } from 'pinia'

export const useWalletStore = defineStore('useWalletStore', () => {
  const data = reactive<{
    info: WalletInfo[]
  }>({
    info: [] as WalletInfo[]
  })
  function saveInfo(walletInfo: WalletInfo[]) {
    data.info = walletInfo
  }

  return { data, saveInfo }
})
