import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import SchermataValutazione from '../views/SchermataValutazione.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/creation',
    name: 'Creation',
    component: () => import('../views/Creation.vue'),
  },
  {
    path: '/creationend',
    name: 'Creationend',
    component: () => import('../views/Creationend.vue'),
  },
  {
    path: '/creationimage',
    name: 'Creationimage',
    component: () => import('../views/Creationimage.vue'),
  },
  {
    path: '/creationvideo',
    name: 'Creationvideo',
    component: () => import('../views/Creationvideo.vue'),
  },
  {
    path: '/creationtris',
    name: 'Creationtris',
    component: () => import('../views/Creationtris.vue'),
  },
  {
    path: '/creationstart',
    name: 'Creationstart',
    component: () => import('../views/Creationstart.vue'),
  },
  {
    path: '/creationsgame',
    name: 'Creationsgame',
    component: () => import('../views/Creationsgame.vue'),
  },
  {
    path: '/gamequiz',
    name: 'Gamequiz',
    component: () => import('../views/Gamequiz.vue'),
  },
  {
    path: '/creationquiz',
    name: 'Creationquiz',
    component: () => import('../views/Creationquiz.vue')
  },
  {
    path: '/creationstory',
    name: 'Creationstory',
    component: () => import('../views/Creationstory.vue')
  },
  {
    path: '/creationstartaccessibile',
    name: 'CreationStartAccessibile',
    component: () => import('../views/Creationstartaccessibile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/valutatore',
    name: 'SchermataValutazione',
    component: SchermataValutazione
  },
  {
    path: '/creationQrGame',
    name: 'CreationQrGame',
    component: () => import('../views/CreationQrGame.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
