<template>
  <div>
    <div v-if="isNotEmpty()">
      <h1 class="text-center text-2xl font-semibold">Giocatori Connessi:</h1>
      <div
        v-for="(giocatore, index) in this.giocatori"
        :key="giocatore.playerId"
      >
        <div
          class="py-8 px-8 max-w-sm mx-auto bg-gray-100 rounded-xl shadow-md space-y-2 sm:py-4 sm:space-y-0 sm:space-x-6 m-1 text-center"
        >
          <p class="text-xl text-black align-top">{{ giocatore.nome }}</p>
          <div class="flex justify-center">
            <input
              type="text"
              v-model="newPlayerName[index]"
              placeholder="Inserisci Alias"
              class="p-r-1"
              :key="index"
            />
            <button
              @click="rinominaGiocatore(index)"
              class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
            >
              Rinomina Giocatore
            </button>
          </div>
          <button
            class="align-bottom px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            @click="updateIndex(index)"
          >
            Visualizza il progresso del Giocatore
          </button>
        </div>
      </div>
      <p class="text-xl text-black align-top font-bold text-center">
        Giocatore: {{ giocatori[shownPlayerIndex].nome }}
      </p>
      <div class="content-center max-w-sm bg-gray-100 mx-auto">
        <div
          v-for="(punteggio, index) in giocatori[shownPlayerIndex].punteggi"
          :key="punteggio.nomeGioco + index"
        >
          <div class="border-2">
            <p class="text-lg text-gray-500 text-center">
              Gioco: {{ punteggio.nomeGioco }} <br />
              Punteggio: {{ punteggio.punti }} <br />
              Tempo Impiegato: {{ punteggio.tempo }}
            </p>
          </div>
        </div>
        <div
          v-if="
            imagePresent == true &&
            immagineDaValutare.playerIdSendingImage ==
              giocatori[shownPlayerIndex].playerId
          "
          class="grid"
        >
          <img :src="immagineDaValutare.imageUrl" />
          <p>Valuta l'immagine con un punteggio ed un commento:</p>
          <input type="number" v-model="punteggioEvalImg" class="border-2" />
          <input
            type="text"
            v-model="commentoImmagine"
            placeholder="Inserisci qua un commento"
            class="border-2"
          />
          <button
            @click="evalImage()"
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Invia Risposta
          </button>
        </div>
        <div
          v-if="
            textPresent == true &&
            textToEval.playerId == giocatori[shownPlayerIndex].playerId
          "
          class="grid"
        >
          <p class="font-semibold">{{ textToEval.text }}</p>
          <p>Valuta il testo con un punteggio ed un commento:</p>
          <input type="number" v-model="punteggioEvalText" class="border-2" />
          <input
            type="text"
            v-model="commentoTesto"
            placeholder="Inserisci qua un commento"
            class="border-2"
          />
          <button
            @click="evalText()"
            class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
          >
            Invia Risposta
          </button>
        </div>
      </div>

      <modal name="playerNeedsHelp">
        <div class="text-xl text-center text-black font-bold py-5">
          Il giocatore: <br />
          {{ giocatoreDaAiutare }} <br />
          ha bisogno di aiuto!
        </div>
      </modal>
      <div class="flex justify-center">
        <button
          @click="svuotaArrGiocatori()"
          class="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
        >
          Svuota Lista Giocatori
        </button>
      </div>
    </div>
    <div v-else>
      <h1 class="text-4xl text-center font-bold">
        Non c'è una storia attiva al momento
      </h1>
    </div>
    <div class="text-cemter text-2xl flex justify-center m-5">
      <input
        type="text"
        placeholder="Dai un nome alla partita"
        v-model="nomePartita"
        class="border-2"
      />
      <button
        @click="saveGame()"
        class="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
      >
        Salva la Partita
      </button>
      <p v-show="partitaSalvata" class="px-4 py-2 m-2">
        La partita e' raggiungibile:
        <a
          :href="'http://localhost:3500/' + nomePartita + '.json'"
          class="underline"
          >{{ nomePartita }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SchermataValutazione",
  data: function () {
    return {
      giocatori: [],
      shownPlayerIndex: 0,
      giocatoreDaAiutare: "",
      immagineDaValutare: {
        imageUrl: "",
        playerIdSendingImage: "",
      },
      imagePresent: false,
      punteggioEvalImg: 0,
      punteggioEvalText: 0,
      newPlayerName: [],
      nomePartita: "",
      partitaSalvata: false,
      textPresent: false,
      textToEval: {
        playerId: "",
        text: "",
      },
      commentoTesto: "",
      commentoImmagine: "",
    };
  },
  methods: {
    getPlayerPoints: function () {
      //chiamata al socket al momento del mounted per prendere i progressi
      this.$socket.client.emit('get_player_points');
    },
    getImage: function () {
      //chiamata all'API per prendere un immagine e ritorna l'URL come stringa
      this.axios
        .get("http://localhost:3500/immagineDaValutare")
        .then((response) => {
          this.immagineDaValutare.imageUrl =
            "http://localhost:3500/" + response.data.url;
          //console.log(this.immagineDaValutare.imageUrl);
          this.immagineDaValutare.playerIdSendingImage = response.data.playerId;
          //console.log(this.immagineDaValutare.playerIdSendingImage);
          this.imagePresent = true;
          alert(
            "Il giocatore: " +
              response.data.playerId +
              " ha inviato un'immagine da valutare"
          );
        })
        .catch((err) => {
          console.log(err);
          this.imagePresent = false;
        });
    },
    saveGame: function () {
      this.$socket.client.emit("save_game", {
        nome: this.nomePartita,
        giocatori: this.giocatori,
      });
      this.partitaSalvata = true;
    },
    updateIndex: function (index) {
      this.shownPlayerIndex = index;
    },
    showModal: function () {
      this.$modal.show("playerNeedsHelp");
    },
    hideModal: function () {
      this.$modal.hide("playerNeedsHelp");
    },
    evalImage: function () {
      //console.log(this.punteggioEvalImg);
      let data = {
        punti: this.punteggioEvalImg,
        commento: this.commentoImmagine,
      };
      this.$socket.client.emit("image_eval", data);
      this.imagePresent = false;
    },
    evalText: function () {
      let data = {
        punti: this.punteggioEvalText,
        commento: this.commentoTesto,
      };
      this.$socket.client.emit("text_eval", data);
      this.textPresent = false;
    },

    isNotEmpty: function () {
      if (this.giocatori && this.giocatori.length) return true;
      else return false;
    },
    rinominaGiocatore: function (index) {
      //console.log(index);
      //console.log(this.newPlayerName);
      this.giocatori[index].nome = this.newPlayerName[index];
      this.$socket.client.emit("rinomina_giocatore", this.giocatori);
      this.newPlayerName[index] = "";
    },
    svuotaArrGiocatori: function () {
      this.$socket.client.emit("flush_arr");
      this.$socket.client.emit("get_player_points")
    },
  },
  sockets: {
    player_points(data) {
      this.giocatori = data;
      //console.log(data);
    },
    needs_help(data) {
      for (var i = 0; i < this.giocatori.length; i++) {
        if (this.giocatori[i].playerId == data) {
          this.giocatoreDaAiutare = this.giocatori[i].nome;
          break;
        }
      }
      this.showModal();
    },
    image_sent(data) {
      this.imagePresent = data;
      this.getImage();
    },
    testo_da_valutare(data) {
      //console.log(data);
      this.textToEval = data;
      this.textPresent = true;
    },
  },
  mounted: function () {
    this.getPlayerPoints();
  },
};
</script>
<style>
</style>