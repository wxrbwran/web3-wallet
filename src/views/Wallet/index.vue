<template>
  <div class="home-content">
    <div class="p-[10px]">
      <Actions @onCreateAccount="onCreateAccount"></Actions>
      <AccountList ref="accountList"></AccountList>
    </div>
    <BottomNote></BottomNote>
  </div>
</template>

<script setup lang="ts">
import Actions from './Actions.vue'
import AccountList from '@/components/account-list.vue'
import BottomNote from '@/components/bottom-note.vue'

const accountList = ref()
const onCreateAccount = () => {
  accountList.value.getWalletInfo()
}
</script>

<style scoped>
/* .home-content {
  @apply flex flex-col justify-between h-full;
  padding-bottom: var(--van-tabbar-height);
} */
</style>
