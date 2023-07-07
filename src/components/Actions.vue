<template>
  <van-space>
    <CreatePassword @onSuccess="onSuccess"></CreatePassword>
    <van-button type="primary">导入钱包</van-button>
  </van-space>
  <van-divider></van-divider>

  <div v-if="mnemonic">
    <van-field type="textarea" class="mb-[10px]" v-model="mnemonic"></van-field>
    <SaveMnemnic :mnemonic="mnemonic" @onSave="onSave"></SaveMnemnic>
  </div>
</template>
<script setup lang="ts">
import CreatePassword from '@/components/dialog/create-password.vue'
import SaveMnemnic from '@/components/dialog/save-mnemnic.vue'

const mnemonic = ref<string>('')

const onSuccess = (val: string) => {
  mnemonic.value = val
}
const onSave = () => {
  console.log('onSave')
}
</script>
<style scoped lang="less"></style>
