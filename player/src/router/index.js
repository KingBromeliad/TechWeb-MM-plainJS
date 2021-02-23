import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//--game pages--//
import Start from '../views/game/Start.vue'
import End from '../views/game/End.vue'
import PathGame from '../views/game/PathGame.vue'
import Question from '../views/game/Question.vue'
import Game from '../views/Game.vue'
import Video from '../views/game/Video.vue'
import ImageGame from '../views/game/ImageGame.vue'
import QrCodeGame from '../views/game/QrCodeGame.vue'
import StartAccessible from '../views/game/StartAccessible.vue'
import MusGame from '../views/MusGame.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/startAccessible',
    name: 'StartAccessible',
    component: StartAccessible
  },
  {
    path: '/start',
    name: 'Start',
    component: Start
  },
  {
    path: '/pathgame',
    name: 'PathGame',
    component: PathGame
  },
  {
    path: '/question',
    name: 'Question',
    component: Question
  },
  {
    path: '/game',
    name: 'Tris',
    component: Game
  },
  {
    path: '/musGame',
    name: 'MusGame',
    component: MusGame
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/imageGame',
    name: 'ImageGame',
    component: ImageGame
  },
  {
    path: '/qrCodeGame',
    name: 'QrCodeGame',
    component: QrCodeGame
  },
  {
    path: '/end',
    name: 'End',
    component: End
  }
]

const router = new VueRouter({
  routes
})

export default router
