<template>
  <div>
    <div
      class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex flex-col sm:items-center sm:space-y-0 sm:space-x-2"
    >
      <div>
        <div v-if="parolachiave[0] != null" class="py-8">
          <button
            role="button"
             aria-labelledby="pulsanti rimozione lettera scelta"
            @click="rimuovi(i)"
            v-for="(item, i) in parolachiave"
            :key="i"
            v-bind:id="'A' + i"
            class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            {{ item }}
          </button>
          <p>La chiave indispettita era quella di ...</p>
        </div>
        <div v-if="parolachiave2[0] != null">
          <button
             role="button" aria-labelledby="pulsanti scelta lettera"
            @click="inserisci(index)"
            v-for="(item2, index) in parolachiave2"
            :key="index"
            v-bind:id="'button2' + index"
            class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            {{ item2 }}
          </button>
        </div>
      </div>
      <div>
        <div v-if="vittoria != true && numerodomanda < lunghezza - 1">
          <button
             role="button" aria-labelledby="Pulsante per andare avanti in caso di vittoria"
            @click="avanti()"
            class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            avanti
          </button>
        </div>
        <div v-else>
          <h1>HAI VINTO</h1>
          <!--<button @click="ricomincia()">ricomincia</button>-->
        </div>
        <div class="flex justify-center">
          <button
            role="button" aria-labelledby="Prossima schermata"
            @click="ontinueToNext()"
            class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
            aria-label="Clicca sul pulsante per continuare"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//    import myjson from './../DevFile/Domande.json'
export default {
  data() {
    return {
      parolasegreta: "asd",
      parolachiave2: [],
      parolachiave: [],
      riserva: [],
      vittoria: false,
      lunghezzacasi: 20,
      albero: [],
      caratteri: "ABCDEFGHIJKLMNOPQRSTUVWYZ",
      numerodomanda: 0,
      item: ["sol"],
      lunghezza: "",
      punti: 0,
      playerId: "",
    };
  },

  mounted: function () {
    this.parolasegreta = this.item[this.numerodomanda];
    this.azzera();
    this.lunghezza = this.item.length;
    this.$socket.client.emit("req_player_id");
  },

  computed: {
    background: function () {
      return "url("+ process.env.VUE_APP_BASE_URL + this.data.images.background + ")";
    },
  },

  sockets: {
    get_player_id(data) {
      this.playerId = data;
      console.log(this.playerId);
    },
  },

  methods: {
    azzera() {
      this.parolachiave2 = [];
      this.parolachiave = [];
      this.riserva = [];
      this.albero = [];

      for (var i = 0; i < this.parolasegreta.length; i++) {
        this.parolachiave.splice(i, 1, "X");
        this.riserva.splice(i, 1, -1);
      }
      console.log(this.parolachiave);

      for (var k = 0; k < this.lunghezzacasi; k++) {
        this.parolachiave2.splice(
          k,
          1,
          this.caratteri.charAt(
            Math.floor(Math.random() * this.caratteri.length)
          )
        );
      }
      for (var j = 0; j < this.parolasegreta.length; j++) {
        var vuoto = false;
        var randomico = Math.floor(Math.random() * 19);
        while (vuoto == false) {
          if (this.albero[randomico] != -1) {
            this.parolachiave2.splice(randomico, 1, this.parolasegreta[j]);
            vuoto = true;
            this.albero[randomico] = -1;
          } else {
            randomico = Math.floor(Math.random() * 19);
          }
        }
      }
      console.log(this.parolachiave2);
      console.log(this.parolasegreta);
    },
    rimuovi(i) {
      if (this.parolachiave[i] != "X") {
        this.parolachiave2.splice(this.riserva[i], 1, this.parolachiave[i]);
        this.riserva[i] = -1;
        this.parolachiave.splice(i, 1, "X");
        console.log(this.parolachiave);
      }
    },
    inserisci(i) {
      for (var j = 0; j < this.parolachiave.length; j++) {
        if (this.parolachiave[j] == "X") {
          this.parolachiave.splice(j, 1, this.parolachiave2[i]);
          this.riserva.splice(j, 1, i);
          this.parolachiave2.splice(i, 1, "X");
          j = this.parolachiave.length;
        }
      }
      var successo = 0;
      for (var k = 0; k < this.parolachiave.length; k++) {
        if (this.parolachiave[k] != this.parolasegreta[k]) {
          k = this.parolachiave.length;
          successo = 1;
        }
      }
      if (successo != 1) {
        this.vittoria = true;
        this.punti = 25;
        console.log("vittoria");
      }
    },
    ricomincia() {
      this.azzera();
      this.numerodomanda = 0;
    },
    avanti() {
      this.numerodomanda++;
      this.parolasegreta = this.item[this.numerodomanda];
      this.azzera();
    },

    continueToNext() {
      this.$emit("gameCompleted");
    },
  },
};
</script>

<style>
[role="button"]:hover,
[role="button"]:focus,
[role="button"]:active{
  color:navy
}

</style>
