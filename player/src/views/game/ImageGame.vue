<template>
  <body
    class="bg-fixed bg-cover bg-no-repeat bg-center min-h-screen"
    v-bind:style="{ 'background-image': background }"
  >
    <!-- GIOCO INVIO IMMAGINE -->
    <div
      v-show="!esitoValutazione && imageGame"
      class="grid place-content-center min-h-screen"
    >
      <div
        class="flex place-content-center text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-6 p-2 m-1 shadow-md"
      >
        <p class="lg:text-6xl text-2xl font-bold text-white">
          Carica la tua immagine o fotografala
        </p>
      </div>
      <div
        class="flex items-center justify-center bg-grey-lighter lg:pt-20 pt-10"
      >
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-xl leading-normal">Scegli un file</span>
          <form enctype="multipart/form-data" class="hidden">
            <input
              type="file"
              name="image"
              accept="image/*"
              capture="camera"
              @change="sendFile($event)"
            />
          </form>
        </label>
      </div>
    </div>
    <!-- GIOCO COMPONIMENTO TESTUALE -->
    <div
      v-show="!esitoValutazione && !imageGame"
      class="grid place-content-center min-h-screen"
    >
      <div
        class="flex justify-center text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-4 p-2 m-10 mb-20 shadow-md"
      >
        <p class="lg:text-6xl text-2xl font-bold text-white">
          Scrivi nel campo di testo sottostante
        </p>
      </div>
      <div class="flex justify-center">
        <textarea
          id="about"
          name="about"
          rows="8"
          v-model="text"
          class="w-3/4 shadow-sm border-4  focus:border-gray-700 focus:outline-none lg:p-3 p-1 lg:text-xl text-md border-gray-300 rounded-md"
          placeholder="Il tuo testo..."
        ></textarea>
      </div>
      <div
      @click="sendText()"
        class="flex items-center justify-center bg-grey-lighter lg:pt-20 pt-10"
      >
        <label
          class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white"
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-xl leading-normal">Invia il testo</span>
        </label>
      </div>
    </div>
    <!-- SCHERMATA VALUTAZIONE -->
    <div
      v-show="esitoValutazione"
      class="grid place-content-center min-h-screen"
    >
      <div
        class="flex place-content-center text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-4 p-2 m-1"
      >
        <p class="lg:text-6xl text-2xl font-bold">
          Ottimo lavoro!
        </p>
      </div>
      <div class="text-center mt-10 mb-10">
        <h1 class="lg:text-6xl text-4xl text-black font-semibold">
          Ti sono stati assegnati: <br />
          {{ punti + " " }} punti! <br />
        </h1>
        <div class="mt-1" v-show="esitoValutazione">
          <p class="text-2xl font-semibold">
            Il Valutatore ha pure detto questo: " {{ commentoValutatore }} "
          </p>
        </div>
      </div>

      <div class="flex justify-center">
        <button
          @click="ContinueToNext()"
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
  name: "imageGame",
  props: {
    data: Object,
    time: String,
  },
  computed: {
    address: function(){
      return process.env.VUE_APP_BASE_URL + "immagineRicevuta"
    },
    imageGame: function() {
      return this.data.image_or_text; //true for image, false for text
    },
    background: function() {
      return "url(" + process.env.VUE_APP_BASE_URL + this.data.images.background + ")";
    },
  },
  data: function () {
    return {
      playerId: "",
      esitoValutazione: false,
      punti: 0,
      commentoValutatore: "",
      text: "",
    };
  },
  methods: {
    sendFile: function (event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      //console.log(this.playerId);
      formData.append("playerId", this.playerId);
      this.axios
        .post(this.address, formData)
        .then((response) => {
          console.log(response);
          this.$socket.client.emit("image_sent", true);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    sendText() {
      let data = {
        playerId: this.playerId,
        text: this.text,
      };
      //console.log(data);
      this.$socket.client.emit("gioco_testo", data);
    },
    ContinueToNext() {
      this.$emit("gameCompleted");
    },
  },
  sockets: {
    get_player_Id(data) {
      this.playerId = data;
      //console.log(this.playerId);
    },
    image_eval(data) {
      this.punti = parseInt(data.punti);
      this.commentoValutatore = data.commento;
      let gioco = {
        playerId: this.playerId,
        nome: this.playerId,
        punteggi: [
          { nomeGioco: "imageGame", punti: this.punti, tempo: this.time },
        ],
      };
      this.esitoValutazione = true;
      this.$socket.client.emit("update_score", gioco);
      this.$emit("updatePoints", this.punti);
    },
    text_eval(data) {
      this.punti = parseInt(data.punti);
      console.log(data.punti);
      this.commentoValutatore = data.commento;
      let gioco = {
        playerId: this.playerId,
        nome: this.playerId,
        punteggi: [
          { nomeGioco: "textGame", punti: this.punti, tempo: this.time },
        ],
      };
      this.esitoValutazione = true;
      this.$socket.client.emit("update_score", gioco);
      this.$emit("updatePoints", this.punti);
    },
  },
  mounted: function () {
    this.$socket.client.emit("req_player_id");
  },
};
</script>