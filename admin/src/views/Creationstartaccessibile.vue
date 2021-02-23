<template>
  <div v-if="items != null" class="justify justify-center space-y-4">
    <h1>This is the creation page</h1>
    <div class="flex flex-col justify-center">
      <div
        class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
      >
        <div class="sm:items-center text-center space-y-2">
          <div class="space-y-0.5 flex flex-col">
            <p class="text-lg text-black font-semibold">
              Aggiungi un paragrafo di testo:
            </p>
            <p class="text-gray-500 font-medium">
              Qua potrai aggiungere il testo che vuoi
            </p>
            <textarea
              v-model="items.text[0]"
              class="focus:ring-indigo-500 w-full focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
              placeholder="aggiungi testo"
            />
            <button
              @click="eliminatesto(index)"
              class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              elimina
            </button>
            <button
              @click="impostaimmagine(index)"
              class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              immagine
            </button>
          </div>
        </div>
      </div>
      <div class="justify-center text-center">
        <div class="flex justify-center">
          <button
            @click="aggiungitesto()"
            class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mt-1"
          >
            Aggiungi Il Testo
          </button>
        </div>
        <div class="justify-center max-w-md">
          <p>Seleziona un background</p>
          <input
            class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mt-1"
            type="file"
            @change="onFileChangedBackground($event)"
          />
          <button
            @click="salvamodifiche()"
            class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            salva
          </button>

          <button
            @click="indietro()"
            class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            indietro
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      selectedFile: null,
      name: [[]],
      listastorie: "",
      items: "",
    };
  },

  sockets: {
    grabjson(data) {
      this.listastorie = data.storie;
      console.log(this.listastorie);
      console.log(this.items);
    },
  },

  methods: {
    aggiungitesto() {
      this.items.text.push("testo");
    },
    impostaimmagine(data) {
      console.log(data);
    },
    eliminatesto(data) {
      this.items.text.splice(data, 1);
    },

    onFileChangedBackground(event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.background = event.target.files[0].name;
      this.axios
        .post("http://localhost:3500/immagineMeglio", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    indietro() {
      this.$router.push("Creationstory");
    },
    salvamodifiche() {
      Vue.prototype.$SavedFile.game[this.$numeroquiz] = JSON.parse(
        JSON.stringify(this.items)
      );
    },
  },

  mounted: function () {
    if(Vue.prototype.$SavedFile==null) this.$router.push("Creation");
    console.log("siamo nella start cration");
    console.log(this.$numeroquiz);
    console.log(
      Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz].option
    );
    this.items = JSON.parse(
      JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz])
    );
  },
};
</script>
