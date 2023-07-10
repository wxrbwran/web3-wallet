<template>
  <div>
    <van-button size="small" type="warning" @click="show = true">我已保存助记词</van-button>
    <van-dialog
      v-model:show="show"
      title="输入助记词"
      show-cancel-button
      @confirm="onSubmit"
      @cancel="show = false"
      :before-close="beforeClose"
      :confirm-button-disabled="!inputMnemonic"
    >
      <van-cell-group inset>
        <van-field
          v-model="inputMnemonic"
          type="textarea"
          name="mnemonic"
          label=""
          placeholder="助记词"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script setup lang="ts">
import { showToast } from 'vant'

const props = defineProps<{
  mnemonic: string
}>()

const emits = defineEmits(['onSave'])

const inputMnemonic = ref<string>('')
const show = ref<boolean>(false)

const beforeClose = () => {
  // console.log('beforeClose')
  // return false
}
const onSubmit = () => {
  // console.log('props.mnemonic', props.mnemonic)
  // console.log('inputMnemonic.value', inputMnemonic.value)
  if (props.mnemonic === inputMnemonic.value) {
    emits('onSave')
    show.value = false
  } else {
    showToast({ type: 'fail', message: '助记词错误' })
  }
}
</script>
<style scoped lang="less"></style>
