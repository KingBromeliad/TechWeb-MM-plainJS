const socket = io("http://localhost:8000/", {
    withCredentials: true,
    extraHeaders: {
        "cors-header" : "valid"
    }
});

Vue.use(VueSocketIOExt, socket);

/*********************************
             ROUTER
 *********************************/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes, // short for `routes: routes`
});

/*********************************
             APP
 *********************************/

const App = new Vue({
  router,
  el: '#app',
  components: {
    Chat,
  },
  beforeCreate: function () {
    axios
      .get("http://localhost:3500/openStory")
      .then((response) => {
        this.game = response.data.game;
        this.no_game = true;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        this.no_game = false;
      });
  },
  computed: {
    formattedElapsedTime() {
      const date = new Date(null);
      date.setSeconds(this.elapsedTime / 1000);
      const utc = date.toUTCString();
      return utc.substr(utc.indexOf(":") - 2, 8);
    },
  },
  data: function () {
    return {
      username: "",
      progress: -1,
      chatActive: false,
      game: [],
      help_interval: 60,
      elapsedTime: 0,
      player_id: "",
      timer: undefined,
      score: 0,
      no_game: false,
    };
  },

  methods: {
    //MAIN NAVIGATION: WORK IN PROGRESS
    nextView() {
      if (this.progress < this.game.length - 1) {
        this.progress++;
        this.reset();
        this.start();
        this.$router.push(this.game[this.progress].route);
      }
    },
    updateScore(points) {
      this.score += points;
    },
    start() {
      this.timer = setInterval(() => {
        this.elapsedTime += 1000;
        if (this.elapsedTime > this.help_interval * 1000) {
          this.askForHelp();
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
    reset() {
      this.elapsedTime = 0;
    },
    askForHelp() {
      this.stop();
      this.reset();
      this.$socket.client.emit("needs_help", this.player_id);
    },
  },
  sockets: {
    get_player_Id(id) {
      this.player_id = id;
    },
  },
  mounted: function () {
    this.$socket.client.emit("req_player_id");
  }
}).$mount()
