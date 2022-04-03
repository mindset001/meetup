import { onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'


const routes = [
  {
    path: '/',
    name: 'Home',
    
    component: () => import(Home.vue),
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, user => {
        if(user){
          next("/chat")
        }else{
          next('/')
        }
      })
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Nav.vue'),

  },
  {
    path: '/chat',
    name: 'Chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Chat.vue'),
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, user => {
        if(user){
          next()
        }else{
          next("/")
        }
      })
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
