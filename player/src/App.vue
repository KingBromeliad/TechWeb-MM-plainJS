<template>
  <div>
    <chat v-show="chatActive" :slideOver="chatActive"></chat>
    <nav
      class="fixed bg-white shadow lg:w-56 w-20 ml-10 rounded-b-lg z-20"
      role="navigation"
    >
      <div
        class="lg:p-3 p-1 flex flex-wrap justify-center md:flex-no-wrap text-center"
      >
        <div class="flex justify-center">
          <button
            @click="chatActive = !chatActive"
            class="focus:outline-none"
            role="button"
            aria-label="Apri la chat"
          >
            <svg
              class="lg:w-10 lg:h-10 w-7 h-7 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
              />
              <path
                d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex justify-center align-middle text-center bg-gray-200 rounded-lg shadow-inner mr-1 lg:ml-3 ml-1"
        >
          <p
            class="text-gray-800 leading-tight lg:text-xl text-lg text-medium font-mono font-medium lg:p-2 p-0"
            aria-label="Contatore Punteggio"
          >
            PUNTI {{ " " + score }}
          </p>
        </div>
      </div>
    </nav>
    <router-view
      :data="this.game[this.progress]"
      @gameCompleted="nextView()"
      :time="this.formattedElapsedTime"
      @updatePoints="updateScore"
      :no_game="this.no_game"
      :punteggioFinale="this.score"
    />
  </div>
</template>

<script>
import Chat from "./components/Chat.vue";

export default {
  name: "App",
  components: {
    Chat,
  },
  beforeCreate: function () {
    this.axios
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
  },
};
</script>
