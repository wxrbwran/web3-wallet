<template>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <!-- <RouterView /> -->
  <div class="p-[10px]">
    <!-- <div>{{ s }}</div> -->
    <!-- <van-button type="primary">创建钱包</van-button> -->
    <!-- <Web3Api></Web3Api> -->
    <AccountSys></AccountSys>
  </div>
</template>
<script setup lang="ts">
// import { Web3 } from 'web3'
import Web3Api from '@/components/learn/web3-api.vue'
import AccountSys from '@/components/learn/account-sys.vue'
</script>

<style scoped lang="less"></style>
