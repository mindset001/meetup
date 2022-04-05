<template>
  <div class="message mt-3">
    <span v-if="!sender" class="other">{{ name }}</span>

    <div class="flex " :class="sender ? 'flex-row-reverse' : ''">
      <Avatar class="mt-1 avatar" :src="photourl"  />
      <div class="text w-1/4" :class="sender ? 'bg-green-400 text-white p-2 rounded  w-10' : 'bg-gray-400 text-white p-2 rounded mb-3'">
        <slot />

      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
export default {
  components: { Avatar },
  props: {
    name: { type: String, default: '' },
    photourl: { type: String, default: '' },
    sender: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
  .flex{
    display: flex;
    align-content: center;
    align-items: center;
    
    }
    .avatar{
      margin-right: 10px;
    }
</style>