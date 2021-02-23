<template>
  <body
    class="bg-fixed bg-cover bg-no-repeat bg-center min-h-screen"
    v-bind:style="{ 'background-image': background }"
  >
    <div v-show="resourceType" class="grid place-content-center h-screen">
      <div class="flex justify-center align-center text-center mb-4">
        <h1 class="text-black md:text-6xl text-2xl font-extrabold">
          {{ title }}
        </h1>
      </div>
      <div class="flex justify-center">
        <iframe
          width="720"
          height="400"
          :src="source"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="flex justify-center">
        <button
          @click="Continue()"
          class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
          role="button"
          aria-label="Continua alla sezione successiva"
        >
          Continue
        </button>
      </div>
    </div>

    <div v-show="!resourceType" class="grid place-content-center h-screen">
      <div class="flex justify-center align-center text-center mb-4">
        <h1 class="text-white lg:text-6xl text-2xl font-extrabold">
          {{ title }}
        </h1>
      </div>
      <div class="flex justify-center">
        <img style="height: 65vh" :src="source" />
      </div>
      <div class="flex justify-center">
        <button
          @click="Continue()"
          class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  </body>
</template>
<script>
export default {
  props: {
    data: Object,
    time: String,
  },
  computed: {
    title: function() {
      return this.data.title[this.line];
    },
    source: function() {
      if (this.data.resourceType) return this.data.source[this.line];
      else return process.env.VUE_APP_BASE_URL + this.data.images.image;
    },
    background: function() {
      return "url(" + process.env.VUE_APP_BASE_URL + this.data.images.background + ")";
    },
    resourceType: function() {
      return this.data.resourceType;
    },
  },
  data: function() {
    return {
      line: 0,
      playerId: ""
    };
  },
  methods: {
    Continue() {
      if (this.line < this.data.source.length - 1) {
        this.line++;
        this.updateScore();
      } else if (this.line == this.data.source.length - 1) {
        this.updateScore();
        this.ContinueToNext();
      }
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
            nomeGioco: "Video",
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
  mounted: function () {
    this.$socket.emit('req_player_id')
  }
};
</script>
