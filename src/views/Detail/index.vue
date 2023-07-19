<template>
  <div @click="handleClick">detail</div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleClick = () => {
  router.push({ name: 'home' })
}
</script>
<style scoped lang="less"></style>
