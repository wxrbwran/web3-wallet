<template>
  <div>
    <van-button :type="btnType || 'primary'" @click="open">{{ btnText }}</van-button>
    <van-dialog
      v-model:show="show"
      :title="showMnemonic ? '输入账号信息' : '输入密码'"
      show-cancel-button
      @confirm="onSubmit"
      @cancel="onCancel"
      :before-close="beforeClose"
    >
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
      />
      <van-field
        v-if="showMnemonic"
        v-model="mnemonic"
        type="password"
        name="mnemonic"
        label="助记词"
        placeholder="助记词"
      />
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { ButtonType, showFailToast } from 'vant'
import { ref } from 'vue'

const props = defineProps<{
  btnText: string
  btnType?: ButtonType
  showMnemonic?: boolean
}>()

const emits = defineEmits(['onSuccess'])

const show = ref<boolean>(false)
const password = ref<string>('')
const mnemonic = ref<string>('')

const beforeClose = () => {
  // console.log('beforeClose')
  // return false
}
const onSubmit = () => {
  // console.log('submit', password.value)
  const params: Record<string, string> = { p: password.value }
  if (props.showMnemonic) {
    if (!mnemonic.value) {
      showFailToast({ message: '请输入助记词' })
      return false
    }
    params.m = mnemonic.value
  }
  emits('onSuccess', params)
  show.value = false
}
const onCancel = () => {
  show.value = false
  password.value = ''
  mnemonic.value = ''
}
const open = async () => {
  // console.log('open')
  show.value = true
}
</script>
<style scoped lang="less"></style>
