import { defineStore } from 'pinia'

export const useWalletStore = defineStore('useWalletStore', () => {
  const data = reactive<{
    info: TWalletInfo[]
  }>({
    info: [] as TWalletInfo[]
  })
  function saveInfo(walletInfo: TWalletInfo[]) {
    data.info = walletInfo
  }

  return { data, saveInfo }
})
