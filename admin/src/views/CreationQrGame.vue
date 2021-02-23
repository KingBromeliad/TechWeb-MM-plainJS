<template>
  <div class="grid place-items-center w-screen h-screen">
    <div class="flex-col place-content-center h-4/5 w-3/5">
      <div class="flex place-content-center text-center">
        <p class="text-4xl font-semibold">
          Inserisci nella casella di testo le parole da decodificare
        </p>
      </div>
      <div
        class="space-y-8 flex-col place-content-center bg-gradient-to-r from-red-200 to-pink-500 rounded-2xl"
      >
        <div class="pt-10 text-center">
          <input
            type="text"
            v-model="newString"
            class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-3/5"
            placeholder="String"
          />

          <button
            class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-2"
            type="button"
            style="transition: all 0.15s ease"
            @click="addString(newString)"
          >
            Accetta
          </button>
        </div>
        <p class="text-center text-2xl">Parole da decodificare:</p>
        <div v-for="(string, i) in stringsToSubmit" :key="i">
              <div class="row-auto text-center text-lg">
                {{ string }}
                <button
                  class="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  style="transition: all 0.15s ease"
                  @click="deleteString(i)"
                >
                  delete
                </button>
              </div>
        </div>
        <div class="pb-10 flex place-content-center">
          <button
            class="bg-green-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button"
            style="transition: all 0.15s ease"
            @click="sendStrings()"
          >
            salva
          </button>
        </div>
        <div class="pb-10 flex place-content-center">
            <p class="text-center text-lg">
              Ricorda di Convertire le parole in codici QR, vedi: <a class="underline" href="https://it.qr-code-generator.com/">Questo Sito</a>
          </p>
        </div>
      </div>
      <button
        @click="indietro()"
        class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
      indietro
     </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "CreationQrGame",
  data: function () {
    return {
      newString: "",
      stringsToSubmit: [],
    };
  },
  methods: {
    addString(newString) {
      this.stringsToSubmit.push(newString);
      console.log(this.stringsToSubmit);
      this.newString = "";
    },
    sendStrings: function () {
      Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz].option=this.stringsToSubmit;
      console.log(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz]);
    },
    deleteString: function (data) {
      this.stringsToSubmit.splice(data,1);
    },
    indietro() {
      this.$router.push("Creationstory");
    },
  },
  mounted: function () {
    if(Vue.prototype.$SavedFile==null) this.$router.push("Creation");
    console.log("siamo nella start cration");
    console.log(this.$numeroquiz);
    console.log(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz]);
    this.items = JSON.parse(JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz]));
    this.stringsToSubmit=this.items.option;
  },
};
</script>
