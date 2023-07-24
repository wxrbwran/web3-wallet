<template>
  <div class="mt-[5px]">
    <div>
      <van-cell title="111" icon="shop-o" v-for="(b, i) in data.board" :key="b.targetId + i">
        <template #right-icon>
          <van-button @click="vote(i)" size="mini">{{ b.amount }}</van-button>
        </template>
      </van-cell>
    </div>
  </div>
</template>
<script setup lang="ts">
const data = reactive({
  board: [
    {
      targetId: 1,
      amount: 1
    }
  ]
})
const vote = (i: number) => {
  console.log('vote', i)
}
</script>
<style scoped lang="less"></style>
