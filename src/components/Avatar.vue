<template>
  <img class="avatar" :src="src" />
</template>

<script>
export default {
  props: { src: { type: String, default: '' } }
}
</script>



<style scoped>
  .avatar{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
</style>
