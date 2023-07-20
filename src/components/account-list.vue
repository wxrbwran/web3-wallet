<template>
  <div>
    <!-- <van-cell
      v-for="(item, index) in walletInfo"
      :key="item.id"
      :title="item.address"
      icon="user-o"
    >
      <template #right-icon>
        <van-icon name="search" class="search-icon" />
      </template> -->
    <!-- </van-cell> -->
    <div v-for="(item, index) in walletInfo" :key="item.id">
      <div class="flex h-[50px] justify-around">
        <h4 class="text-red-500 w-[60px] flex-none">账号{{ index + 1 }}：</h4>
        <p class="break-words select-all w-[170px]">{{ item.address }}</p>
        <InputPassword
          btn-type="warning"
          :btn-text="`余额：${item.balance}`"
          @onSuccess="(password) => onSuccess(item, password, index)"
        />
      </div>
      <van-divider></van-divider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Account1, WalletInfoStorageKey } from '@/utils/consts'
import Wallet from 'ethereumjs-wallet'
import InputPassword from '@/components/dialog/input-password.vue'
import { useWalletStore } from '@/stores/useWalletStore'
import { getPrivateKeyByWeb3KeyStore, transfer } from '@/utils/tools'
import { showToast } from 'vant'

const { proxy } = getCurrentInstance() as any
const walletInfo = ref<TWalletInfo[]>([])
const walletStore = useWalletStore()

const getWalletInfo = async () => {
  const toast = showToast({ type: 'loading' })
  const walletInfoLocal = window.$storage.get(WalletInfoStorageKey) || []
  await walletInfoLocal.forEach(async (info: TWalletInfo, index: number) => {
    const res = await proxy?.web3?.eth.getBalance(info.address)
    const balance = proxy?.web3?.utils.fromWei(res || '0', 'ether')
    info.balance = +Number.parseFloat(balance).toFixed(7)
    walletInfo.value[index] = info
  })
  toast.close()
}
const onSuccess = async (item: TWalletInfo, { p }: { p: string }, index: number) => {
  try {
    const pk = getPrivateKeyByWeb3KeyStore(proxy.web3, item.keystore, p)
    if (pk) {
      await transfer(proxy.web3, item.address, Account1, pk)
      // console.log('res', res)
      showToast({ type: 'success', message: '转账成功' })
      walletInfo.value[index] = await proxy?.web3?.eth.getBalance(item.address)
      walletStore.saveInfo(walletInfo.value)
      window.$storage.set(WalletInfoStorageKey, walletInfo.value)
    }
  } catch (e: any) {
    showToast({ type: 'fail', message: e.message })
  }
}
onMounted(() => {
  getWalletInfo()
})

defineExpose({
  getWalletInfo
})
</script>
<style scoped lang="less"></style>
