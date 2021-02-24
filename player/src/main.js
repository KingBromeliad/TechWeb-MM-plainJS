import Chat from "./components/Chat.js";
import Home from "./views/Home.js";
import Start from "./views/Start.js";
import PathGame from "./views/PathGame.js";
import Question from "./views/Question.js";
import End from "./views/End.js";
import StartAccessible from "./views/StartAccessible.js";
import Game from "./views/Game.js";
import Video from "./views/Video.js";
import ImageGame from "./views/ImageGame.js";
import QrCodeGame from "./views/QrCodeGame.js";
import MusGame from "./views/MusGame.js";

var socket = io("http://localhost:8000", {
  withCredentials: true,
  extraHeaders: {
    "cors-header": "valid",
  },
});

Vue.use(VueSocketIOExt, socket);

/*********************************
             ROUTER
 *********************************/
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/startAccessible",
    name: "StartAccessible",
    component: StartAccessible,
  },
  {
    path: "/start",
    name: "Start",
    component: Start,
  },
  {
    path: "/pathgame",
    name: "PathGame",
    component: PathGame,
  },
  {
    path: "/question",
    name: "Question",
    component: Question,
  },
  {
    path: "/game",
    name: "Tris",
    component: Game,
  },
  {
    path: "/musGame",
    name: "MusGame",
    component: MusGame,
  },
  {
    path: "/video",
    name: "Video",
    component: Video,
  },
  {
    path: "/imageGame",
    name: "ImageGame",
    component: ImageGame,
  },
  {
    path: "/qrCodeGame",
    name: "QrCodeGame",
    component: QrCodeGame,
  },
  {
    path: "/end",
    name: "End",
    component: End,
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

/*********************************
             APP
 *********************************/

const App = new Vue({
  router,
  el: "#app",
  components: {
    Chat,
  },
  beforeCreate: function () {
    axios
      .get("http://localhost:8000/openStory")
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
    connect() {
      console.log("socket connected");
    },
    get_player_Id(id) {
      this.player_id = id;
    },
  },
  mounted: function () {
    this.$socket.client.emit("req_player_id");
  },
}).$mount();
