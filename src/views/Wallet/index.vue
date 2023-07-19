<template>
  <div class="p-[10px]">
    <Actions @onCreateAccount="onCreateAccount"></Actions>
    <AccountList ref="accountList"></AccountList>
  </div>
</template>

<script setup lang="ts">
import Actions from './Actions.vue'
import AccountList from '@/components/account-list.vue'

const accountList = ref()
const onCreateAccount = () => {
  accountList.value.getWalletInfo()
}
</script>
