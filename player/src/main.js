Vue.use(VueSocketIOExt, socket);

const socket = io("http://localhost:3000/", {
    withCredentials: true,
    extraHeaders: {
        "cors-header" : "valid"
    }
});

/*********************************
             ROUTER
 *********************************/
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
  routes, // short for `routes: routes`
});

/*********************************
             APP
 *********************************/

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
