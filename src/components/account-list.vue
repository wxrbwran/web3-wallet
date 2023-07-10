<template>
  <div>
    <div v-for="(item, index) in walletInfo" :key="item.id">
      <div class="flex h-[50px]">
        <h1 class="text-red-500 w-[60px] flex-none">账号{{ index + 1 }}：</h1>
        <p class="break-words select-all w-[295px]">{{ item.address }}</p>
      </div>
      <van-divider></van-divider>
    </div>
  </div>
</template>
<script setup lang="ts">
import { WalletInfoStorageKey } from '@/utils/consts'

const walletInfo = ref<WalletInfo[]>([])

const getWalletInfo = () => {
  const walletInfoLocal = window.$storage.get(WalletInfoStorageKey) || []
  console.log('walletInfoLocal', walletInfoLocal)
  walletInfo.value = walletInfoLocal
}

onMounted(() => {
  getWalletInfo()
})

defineExpose({
  getWalletInfo
})
</script>
<style scoped lang="less"></style>
