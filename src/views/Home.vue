<template>
  <div class="home">
  <div class="img">
    <img src="https://res.cloudinary.com/mindset/image/upload/v1629985788/animation_500_ksszfkzi_j4kdzq.gif" alt="" class="mobile">
  </div>
  <Nav/>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav
  }
}
</script>


<style scoped>

.img{
    background: #BE94EA;
    height: 100vh;
    display: flex;
    justify-content: center;
}
    .home{
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media screen  and (max-width: 768px){
    .img{
      display: none;
    }
    .home{
      display: flex;
      justify-content: center;
      align-content: center;
    }
}
</style>