<template>
  <div
    class="bg-fixed bg-center bg-cover bg-no-repeat min-h-screen m-0 p-0"
    v-bind:style="{ 'background-image': background }"
  >
    <div class="grid grid-cols-2 gap-4 place-content-center h-screen">
      <!-- WELCOME INSIDE THE GRID LAYOUT-->
      <div class="flex flex-wrap content-end justify-center pb-2 h-screen">
        <img :src="character" alt="character" style="height: 70vh" />
      </div>
      <div class="flex content-center justify-center flex-wrap space-y-8">
        <div class="bg-white rounded-md text-center lg:mr-4 mr-2">
          <p class="text-black font-extrabold lg:text-4xl text-2xl lg:m-10 m-2">
            {{ text }}
          </p>
        </div>

        <button
          @click="Continue()"
          class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-extrabold text-center text-white lg:text-4xl text-2xl lg:ml-40 ml-10 lg:p-4 p-2"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    time: String,
  },
  computed: {
    text: function() {
      if (this.data != null) {
        return this.data.text[this.line];
      } else return "loading...";
    },
    option: function() {
      if (this.data != null) {
        return this.data.option[this.line];
      } else return "...";
    },
    background: function() {
      if (this.data.images.background.length == 1)
        return (
          "url("+ process.env.VUE_APP_BASE_URL + this.data.images.background[0] + ")"
        );
      else
        return ( "url(" +
          process.env.VUE_APP_BASE_URL +
          this.data.images.background[this.line] +
          ")"
        );
    },
    character: function() {
      if (this.data.images.singleCharacter) {
        return process.env.VUE_APP_BASE_URL + this.data.images.character;
      } else
        return (
          process.env.VUE_APP_BASE_URL + this.data.images.characters[this.line]
        );
    },
  },
  data: function() {
    return {
      line: 0,
      playerId: "",
    };
  },
  methods: {
    Continue() {
      if (this.line < this.data.text.length - 1) {
        this.line++;
      } else if (this.line == this.data.text.length - 1) {
        this.ContinueToNext();
      }
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
            nomeGioco: "intro",
            punti: 1,
            tempo: this.time
          },
        ],
      };
      this.$socket.client.emit("update_score", data);
      this.$emit('updatePoints', 1);
      //console.log(this.score);
    },
    get_player_Id(data) {
      this.playerId = data;
    },
  },
};
</script>
