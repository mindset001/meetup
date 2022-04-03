<template>
  <nav>
    <div class="dark">
      <h1 class="text text-7xl "><strong>Meet</strong>UP</h1>

      <p>Welcome, Connect with your team.</p>

      <div v-if="isLogin" class="login">
        <!-- <Avatar :src="user.photoURL"  /> -->
        <!-- <h1>{{user.displayName}}</h1> -->
        <button class="text-gray-400 hover:text-white" @click="signOut">
          Sign Out
        </button>
      </div>

      <button v-else class="bg-green-500 hover:bg-green-600" @click="login">
        Sign in
      </button>
      <img src="https://res.cloudinary.com/mindset/image/upload/v1649002174/82488-team-members-meetup_yam5e0.gif" alt="" style="height: 400px; width:400px;" class="desktop">
    </div>
  </nav>
</template>

<script>
// import Avatar from './Avatar.vue'
import { useAuth } from '@/firebase'
export default {
  // components: { Avatar },
  setup() {
    const { user, isLogin, signOut, signup } = useAuth()
    return { user, isLogin, signOut, signup }
  },

  methods: {
   async login(){
    const {user, err} = await this.signup()
      if(user) {
        this.$router.push('/chat')
      }
      console.log(err);
    }
  },
}
</script>


<style scoped>
 *{
    overflow: hidden;
  }
  .text{
      font-family: 'Ubuntu';
      font-style: normal;
      font-weight: 700;
      line-height: 57px;
      letter-spacing: 0.03em;
      color: #621A7B;
  }

  .desktop{
    display: none;
  }

  p{
      font-family: 'Montserrat';
      padding-top: 80px;;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.02em;
      color: #111111;
  }
  .dark{
    
    padding-top: 188px;
    text-align: center;
  }

  button{
    width: 318px;
    height: 50px;
    left: 912px;
    background: #621A7B;
    box-shadow: 1px 3px 4px rgba(98, 26, 123, 0.18);
    border-radius: 10px;
    color: #fff;
    margin-top: 30px;
  }

  @media screen  and (max-width: 768px){

  .desktop{
    display: block;
  }
  .text{
      font-size: 40px;
  }
  }
</style>