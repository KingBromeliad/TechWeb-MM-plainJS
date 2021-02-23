<template>
  <body class="bg-blue-400 min-h-screen">
    <div class="grid place-content-center grid-cols-3 min-h-screen">
      <!-- shore-->
      <div>
        <img
          class="object-fill min-h-full"
          :src="shoreL"
          alt="shoreL"
        />
      </div>
      <div
        v-show="!victory"
        class="grid place-content-center grid-cols-4 grid-rows-4 gap-x-2 h-screen lg:pt-20 lg:pb-20 "
      >
        <!-- ROCKS -->
        <Rock
          v-for="rock in rocks"
          v-bind:key="rock.id"
          :initialAngle="rock.angle"
          :rotates="rock.rotates"
          :id="rock.id"
          @rockClick="rockClick"
        ></Rock>

        <!--end-->
      </div>

      <div
        class="grid place-content-center text-center h-screen"
        v-show="victory"
      >
        <h1
          class="text-white lg:text-4xl text-2xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-4 p-2 m-1"
        >
          COMPLIMENTI SEI RIUSCITO A PASSARE!
        </h1>
        <p class="text-black lg:text-4xl text-xl font-medium lg:p-4 p-2">
          {{ attempts_text }}
        </p>
        <p class="text-black lg:text-4xl text-xl font-medium lg:p-4 p-2">
          E ottenuto: <br />{{ this.punti + "" }} Punti
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
      <!-- shore-->
      <div>
        <img
          class="object-fill min-h-full"
          :src="shoreR"
          alt="shoreR"
        />
      </div>
    </div>
  </body>
</template>
<script>
import Rock from "../../components/Rock.vue";
export default {
  props: {
    data: Object,
    time: String,
  },
  components: {
    Rock,
  },
  computed: {
    attempts_text: function() {
      if (this.attempts == 1) return "IN SOLO 1 TENTATIVO!";
      else return "IN SOLI " + this.attempts + " TENTATIVI";
    },
    text: function() {
      if (this.data != null) {
        return this.data.text[this.line];
      } else return "loading...";
    },
    shoreL: function(){
      return process.env.VUE_APP_BASE_URL +"dinosaurStory/ShoreL.png"
    },
    shoreR: function(){
      return process.env.VUE_APP_BASE_URL +"dinosaurStory/ShoreR.png"
    },
    rock: function() {
      return process.env.VUE_APP_BASE_URL + this.data.images.rock;
    },
  },
  data: function() {
    return {
      victory: false,
      rocks: [
        { id: 1, angle: 3, rotates: false },
        { id: 2, angle: 2, rotates: true },
        { id: 3, angle: 2, rotates: false },
        { id: 4, angle: 2, rotates: false },
        { id: 5, angle: 0, rotates: false },
        { id: 6, angle: 2, rotates: true },
        { id: 7, angle: 0, rotates: false },
        { id: 8, angle: 3, rotates: false },
        { id: 9, angle: 1, rotates: false },
        { id: 10, angle: 2, rotates: false },
        { id: 11, angle: 0, rotates: false },
        { id: 12, angle: 1, rotates: false },
        { id: 13, angle: 0, rotates: false },
        { id: 14, angle: 1, rotates: true },
        { id: 15, angle: 0, rotates: true },
        { id: 16, angle: 3, rotates: false },
      ],
      correctPath: [1, 2, 6, 10, 9, 13, 14, 15, 11, 12, 16],
      path: [],
      attempts: 0,
      punti: 0,
    };
  },
  methods: {
    rockClick(id, isActive) {
      if (isActive) {
        this.path.push(id);
      } else {
        const index = this.path.indexOf(id);
        if (index > -1) {
          this.path.splice(index, 1);
        }
      }
      if (id == 16) {
        this.attempts++;
        this.checkPath();
      }
    },
    checkPath() {
      if (this.path.length == this.correctPath.length) {
        this.path.sort((a, b) => a - b);
        this.correctPath.sort((a, b) => a - b);
        let areEqual = true;
        let index = 0;
        while (areEqual && index < this.correctPath.length - 1) {
          if (this.correctPath[index] == this.path[index]) areEqual = true;
          else areEqual = false;
          index++;
        }
        if (areEqual) this.win();
      }
    },
    win() {
      this.victory = true;
      this.punti = 220 - 20*this.attempts;
      this.updateScore();
    },
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
            nomeGioco: "TrovaPercorso",
            punti: this.punti,
            tempo: this.time
          },
        ],
      };
      this.$socket.client.emit("update_score", data);
      this.$emit('updatePoints', this.punti);
    },
  },
  sockets: {
    req_player_id(data) {
      this.playerId = data;
    },
  },
};
</script>
