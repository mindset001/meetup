<template>
    <div>
        <div class="mx-5 now msg" v-if="messages.length">
    
      <Message
        v-for="item in messages"
        :key="item.id"
        :name="item.userName"
        :photourl="item.userPhotoURL"
        :sender="item.userId === user.uid"
      >
        {{ item.text }}
      </Message>

      <!-- <div v-for="item in messages" :key="item.id">
      {{ item.text }}
      </div> -->
        <div ref="bottom" class="mt-2" />
    </div>
    </div>
</template>

<script>

import Message from './Message.vue'
import { useAuth } from '@/firebase'
import { ref, watch, nextTick } from 'vue'
import { useChat } from '@/firebase'
export default {
    components: {
        Message
    },
 setup() {
    const { user, isLogin, signOut, signup } = useAuth()
    const { messages, sendMessage } = useChat()
    const bottom = ref(null)

    
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )


    const message = ref('')
    const send = () => {
      sendMessage(message.value, user.value, isLogin.value)
      message.value = ''
    }
    return { user, isLogin, messages, bottom, message, signOut, signup, send }
  },
}
</script>

<style scoped>
     .msg{
  
    max-height: 50vh;
    overflow: scroll;
  }
</style>