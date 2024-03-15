<template>
  <div>
    <div class="green" @click="goTo"><span>点我测试跳转</span></div>
  </div>
</template>

<script setup lang="ts">
const goTo = () => {
  if (window.top === window.self) {
    window.location.href = 'https://zhihu.com'
  } else {
    window.parent.location.href = 'https://zhihu.com'
  }
}
</script>

<style scoped>
.green {
  height: 400px;
  width: 400px;
  background-color: green;
}

span {
  font-size: 50px;
  color: ;
}
</style>