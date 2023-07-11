<template>
  <div>
    <van-button :type="btnType || 'primary'" @click="open">{{ btnText }}</van-button>
    <van-dialog
      v-model:show="show"
      title="输入密码"
      show-cancel-button
      @confirm="onSubmit"
      @cancel="onCancel"
      :before-close="beforeClose"
      :confirm-button-disabled="!password"
    >
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
      />
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { ButtonType } from 'vant'
import { ref } from 'vue'

defineProps<{
  btnText: string
  btnType?: ButtonType
}>()

const emits = defineEmits(['onSuccess'])

const show = ref<boolean>(false)
const password = ref<string>('')

const beforeClose = () => {
  // console.log('beforeClose')
  // return false
}
const onSubmit = () => {
  // console.log('submit', password.value)
  emits('onSuccess', { p: password.value })
  show.value = false
}
const onCancel = () => {
  show.value = false
  password.value = ''
}
const open = async () => {
  // console.log('open')
  show.value = true
}
</script>
<style scoped lang="less"></style>
