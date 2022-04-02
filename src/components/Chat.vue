<template>
  <div class="container-sm mt-20">
    <div class="mx-5" v-if="messages.length">
    
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

    </div>
  </div>
  <div ref="bottom" class="mt-20" />
  <div class="bottom">
    <div class="container-sm">

      <form v-if="isLogin" @submit.prevent="send">


        <input v-model="message" placeholder="Message" required />

        <button type="submit">
          <SendIcon />
        </button>
        
      </form>
    </div>
  </div>
</template>
<script>
import { ref, watch, nextTick } from 'vue'
import { useAuth, useChat } from '@/firebase'
import SendIcon from './SendIcon.vue'
import Message from './Message.vue'
export default {
  components: {  Message, SendIcon },
  setup() {
    const { user, isLogin } = useAuth()
    const { messages, sendMessage } = useChat()
    const bottom = ref(null)
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value?.scrollIntoView({ behavior: 'smooth' })
        })
      },
      { deep: true }
    )
    const message = ref('')
    const send = () => {
      sendMessage(message.value, user.value, isLogin.value)
      message.value = ''
    }
    return { user, isLogin, messages, bottom, message, send }
  }
}
</script>
