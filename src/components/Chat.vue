<template>
  <div class="mt-5">

   <div v-if="isLogin" class="login">
        <div style="" class="mobile">
         <Avatar :src="user.photoURL"  />
        <h1 class="text-center text-2xl "><strong>MeetUP</strong></h1>
         
          <button class="text-gray-400 hover:text-white button" @click="Signout">
          Sign Out
        </button>
        
        </div>
        <!-- <h1>{{user.displayName}}</h1> -->
      </div>

      <button v-else class="bg-green-500 hover:bg-green-600" @click="login">
        Sign in
      </button>
      <!-- <img src="../assets/img.gif" alt="" style="height: 40px; width:40px;"> -->
<Scroll/>

    </div>

    

    
  <!-- </div> -->
  
  <div class="bottom">
    <div class="">

      <form v-if="isLogin" @submit.prevent="send">


        <input v-model="message" placeholder="Message" required />

        <button type="submit">
          <SendIcon class="icon"/>
        </button>
        
      </form>
    </div>
  </div>
</template>
<script>
import Avatar from './Avatar.vue'
import { useAuth } from '@/firebase'
import { ref, watch, nextTick } from 'vue'
import { useChat } from '@/firebase'
import SendIcon from './SendIcon.vue'
import Scroll from './Scroll.vue'

export default {
  components: { Avatar, 
    // Message, 
    SendIcon, Scroll },

  // setup() {
  //   const { user, isLogin, signOut, signup } = useAuth()
  //   return { user, isLogin, signOut, signup }
  // },
  setup() {
    const { user, isLogin, signOut, signup } = useAuth()
    const { messages, sendMessage } = useChat()
    const bottom = ref(null)

    
    watch(
      messages,
      () => {
        nextTick(() => {
          bottom.value.scrollIntoView({ behavior: 'smooth',})
        })
      },
      { deep: false }
    )


    const message = ref('')
    const send = () => {
      sendMessage(message.value, user.value, isLogin.value)
      message.value = ''
    }
    return { user, isLogin, messages, bottom, message, signOut, signup, send }
  },

  methods: {
    Signout(){
            this.signOut()
            this.$router.push('/')
    },
  },  
}
</script>


<style scoped>

*{
  background: url('https://res.cloudinary.com/mindset/image/upload/v1648979740/75901-background_w2ni6g.gif');
  
}

.icon{
  width: 50px;
  height: 10px;
  margin-top: -23px;
}
form{
  display: flex;
  padding: 0 2em;
  align-items: center;
  justify-content: center;
  
  
}
  input{
    border: solid 1px #000;
    border-radius: 5px;
    width: 50%;
    height: 50px;
    padding-left: 10px;
   
  }

  .button{
    width: 118px;
    height: 50px;
    background: #621A7B;
    box-shadow: 1px 3px 4px rgba(98, 26, 123, 0.18);
    border-radius: 10px;
    color: #fff;
    
  
  }
   .mobile{
      display:flex;
       align-items:center;
        justify-content:space-between;
        padding-left: 15px;
        padding-right: 15px;
        margin-bottom: 10px;
  }
 

 @media screen and (max-width: 768px){
    input {
      width: 15em;
      margin-left: 10px;
    }
     .now{
      padding-left: 0em;
      padding-right: 0em;

  }
  .mobile{
      display:flex;
       align-items:center;
        justify-content:space-between;
        padding-left: 15px;
        padding-right: 15px;
        margin-bottom: 10px;
  }
   .button{
    width: 88px;
    height: 40px;
    background: #621A7B;
    box-shadow: 1px 3px 4px rgba(98, 26, 123, 0.18);
    border-radius: 10px;
    color: #fff;
    
  }
  .bottom{
    border-bottom: solid 2px #621A7B;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    height: 100px;
    overflow: scroll;
  

  }
  
 
}


</style>