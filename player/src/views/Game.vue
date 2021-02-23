<template>
  <body
    class="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen"
    v-bind:style="{ 'background-image': background }"
  >
    <section v-show="!trisCompleted" class="text-gray-600 body-font">
      <div class="grid place-content-center min-h-screen">
        <div class="flex flex-col">
          <div class="flex justify-center items-center mt-0 mr-0 mb-3 ">
            <img :src="symbol" style="height: 8vh" />
            <h1 class="lg:text-8xl md:text-4xl text-2xl font-bold text-white">
              <b>Tris!</b>
            </h1>
          </div>
          <div class="flex justify-center">
            <board :squares="squares" :winner="winner" @click="click" />
          </div>
          <div
            class="game-info bg-white rounded-lg text-xl px-2 py-4 text-center shadow"
          >
            <p
              v-if="stepNumber === 0"
              class="flex items-center justify-center m-0"
            >
              Cominciamo! Cucciolo d'uomo inizia, sei la&nbsp;<b
                :class="currentPlayer"
                >{{ currentPlayer }}</b
              >!
            </p>
            <p v-else-if="!!winner">
              Il vincitore è stato:&nbsp;
              <b :class="currentPlayer">{{ currentPlayer }}</b
              >!&nbsp;
              <button
                @click="restart"
                class="bg-white border-white border-solid border-2 cursor-pointer font-semibold text-xs -my-2 mr-0 ml-4 py-2 px-4 uppercase"
              >
                Gioca nuovamente
              </button>
            </p>
            <p v-else-if="stepNumber > 8">
              Parità!&nbsp;
              <button
                @click="restart"
                class="bg-white border-white border-solid border-2 cursor-pointer font-semibold text-xs -my-2 mr-0 ml-4 py-2 px-4 uppercase"
              >
                Gioca nuovamente
              </button>
            </p>
            <p v-else>
              Ora tocca al giocatore&nbsp;
              <b :class="currentPlayer">{{ currentPlayer }}</b
              >!&nbsp;vai.
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            @click="checkResults()"
            class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
          >
            Risultati
          </button>
        </div>
      </div>
    </section>
    <section v-show="trisCompleted">
      <div class="grid place-content-center text-center h-screen">
        <h1
          class="text-white lg:text-8xl text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-4 p-2 m-1"
        >
          COMPLIMENTI!
        </h1>
        <p class="text-black lg:text-8xl text-4xl font-medium lg:p-4 p-2">
          Hai ottenuto: <br />{{ this.punti + "" }} Punti
        </p>
        <div class="flex justify-center">
          <button
            @click="ContinueToNext()"
            class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  name: "Game",
  components: {
    Board: () => import("./Board"),
  },

  props: {
    data: Object,
    time: String,
  },

  computed: {
    background: function() {
      return "url(" + process.env.VUE_APP_BASE_URL + this.data.images.background + ")";
    },
    symbol: function() {
      return process.env.VUE_APP_BASE_URL + this.data.images.symbol;
    },
  },

  data() {
    return {
      squares: Array(9).fill(null),
      stepNumber: 0,
      currentPlayer: "X",
      winner: null,
      punti: 0,
      trisCompleted: false,
      playerId: "",
    };
  },

  methods: {
    ContinueToNext() {
      this.$emit("gameCompleted");
    },

    updateScore() {
      //punteggio aggiornato via via passandoli un valore
      let data = {
        playerId: this.playerId,
        nome: this.playerId,
        punteggi: [
          {
            nomeGioco: "Tris",
            punti: this.punti,
            tempo: this.time
          },
        ],
      };
      this.$socket.client.emit("update_score", data);
      this.$emit('updatePoints', this.punti);
    },

    hasWinner() {
      if (this.winner) return true;
      const squares = this.squares;
      const matches = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < matches.length; i++) {
        const [a, b, c] = matches[i];
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          this.winner = [a, b, c];
          return true;
        }
      }
      return false;
    },

    restart() {
      this.squares = Array(9).fill(null);
      this.stepNumber = 0;
      this.winner = null;
    },

    click(i) {
      if (this.hasWinner()) {
        this.punti += 30;
      }
      if (this.squares[i] || this.winner) return;
      this.$set(this.squares, i, this.currentPlayer);
      if (!this.hasWinner()) {
        this.punti += 5;
        this.stepNumber++;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      }
    },

    checkResults: function() {
      this.trisCompleted = true;
      this.updateScore();
    },
  },
  sockets: {
    get_player_id(data) {
      this.playerId = data;
      console.log(this.playerId);
    },
  },
};
</script>

<style scoped>
.game-info {
  backdrop-filter: blur(10px);
  background-blend-mode: exclusion;
  color: rgba(17, 17, 17, 1);
}

.game-info .X,
.game-info .O {
  text-shadow: -1px -1px 0 #000b, -1px 1px 0 #000b, 1px -1px 0 #000b,
    1px 1px 0 #000b;
}
.game-info .X {
  color: #258367;
}
.game-info .O {
  color: #ca3d33;
}
.game-info button {
  text-shadow: 0 0 1px #fff, 0 2px 5px #fff5;
  color: #111;
  cursor: pointer;
  outline: none;
  transition: all 0.25s ease;
}
.game-info button:focus,
.game-info button:hover {
  background: #1115;
  border-color: rgba(var(--theme-color));
  box-shadow: 0 0 10px rgba(var(--theme-color), 0.75);
  color: rgba(var(--theme-color));
  text-shadow: -1px -1px 0 #0007, -1px 1px 0 #0007, 1px -1px 0 #0007,
    1px 1px 0 #0007;
}
.game-info button:active {
  background: #1119;
}
</style>
