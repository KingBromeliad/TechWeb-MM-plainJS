<template>
  <div>
    <h1>gioco 1</h1>
    <div
      v-if="domande[0] != null"
      class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex flex-col sm:items-center sm:space-y-0 sm:space-x-2"
    >
      <div
        v-if="numerodomanda < lunghezza"
        class="sm:flex flex-col sm:items-center"
      >
        <h1>{{ this.domande[numerodomanda].domanda }}</h1>
        <button
          @click="risposta(index)"
          v-for="(item, index) in domande[numerodomanda].argomento"
          :key="index"
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          {{ item }}
        </button>
        <button v-if="numerodomanda < lunghezza" @click="avanti">avanti</button>
      </div>
      <div v-else class="sm:flex flex-col sm:items-center">
        <h1>hai fatto {{ corrette }} domande corrette su {{ lunghezza }}</h1>
        <button @click="riprova()">riprova</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numerodomanda: 0,
      rispostamomentanea: "nd",
      soluzione: "",
      lunghezza: "",
      domande: [
        {
          domanda: "quali sono gli animali?",
          argomento: ["pangolino", "cane", "pipistrello", "coltello"],
          soluzione: 0,
        },
        {
          domanda: "altra domanda",
          argomento: ["piovra", "cane", "sasso", "colibrì"],
          soluzione: 2,
        },
        {
          domanda: "altra domanda",
          argomento: ["piovra", "cane", "sasso", "colibrì"],
          soluzione: 3,
        },
      ],
      corrette: 0,
      items: [{ message: "Foo" }, { message: "Bar" }],
    };
  },

  mounted: function () {
    console.log("montato");
    this.lunghezza = this.domande.length;
    console.log(this.lunghezza);
  },

  sockets: {
    domandericevute(dati) {
      console.log(dati);
    },
  },
  methods: {
    mostra() {
      console.log(this.domande);
    },
    avanti() {
      if (this.rispostamomentanea == this.soluzione) {
        console.log("bravo");
        this.corrette = this.corrette + 1;
      }
      this.numerodomanda = this.numerodomanda + 1;
      if (this.numerodomanda < 2) {
        this.soluzione = this.domande[this.numerodomanda].soluzione;
      }
    },

    risposta(data) {
      this.rispostamomentanea = data;
    },

    riprova() {
      console.log("ciao");
      this.numerodomanda = 0;
      this.soluzione = this.domande[0].soluzione;
      this.corrette = 0;
    },
  },
};
</script>
