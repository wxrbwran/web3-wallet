<template>
  <div>
    <van-button type="primary" @click="createWallet">创建钱包</van-button>
    <van-dialog
      v-model:show="show"
      title="输入密码"
      show-cancel-button
      @confirm="onSubmit"
      @cancel="show = false"
      :before-close="beforeClose"
      :confirm-button-disabled="!password"
    >
      <van-cell-group inset>
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import * as bip39 from 'bip39'
import { ref } from 'vue'

// const props = defineProps({
//   show: {
//     type: Boolean,
//     default: false
//   }
// })

const emits = defineEmits(['onSuccess'])

const mnemonic = ref<string>('')
const show = ref<boolean>(false)
const password = ref<string>('')

const beforeClose = () => {
  // console.log('beforeClose')
  // return false
}
const onSubmit = () => {
  console.log('submit', password.value)
  const val = bip39.generateMnemonic()
  mnemonic.value = val
  emits('onSuccess', val)
  show.value = false
}

const createWallet = async () => {
  console.log('createWallet')
  show.value = true
}
</script>
<style scoped lang="less"></style>
