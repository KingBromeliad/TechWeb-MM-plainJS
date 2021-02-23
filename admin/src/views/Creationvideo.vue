<template>
  <div
    class="block py-8 px-8 max-w-lg mx-auto center bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
  >
    <div
      class="flex flex-col justify-center text-center space-y-2 sm:text-left"
    >
      <div class="space-y-0.5">
        <p class="text-lg text-black font-semibold">Creazione Video</p>
        <p class="text-gray-500 font-medium">
          seleziona un file nel tuo pc per la tua storia
        </p>
      </div>
      <div v-if="items.image_or_text != true" class="flex flex-col">
        <p>seleziona background:</p>
        <input
          class="px-16 py-2 mt-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="file"
          @change="onFileChangedBackground($event)"
        />
        <p>
          Inserisci qui il titolo ed il link al video (ricavato tramite la
          funzionalità embed). Puoi inserirne anche più di uno, basta che ogni
          volta premi salva:
        </p>
        <input
          class="px-5 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="text"
          placeholder="Titolo del Video"
          v-model="titoloVid"
        />

        <input
          class="px-5 py-2 mt-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          type="text"
          placeholder="https://youtube.com/embed/videoUrl"
          v-model="linkToVid"
        />
      </div>
      <button
        @click="indietro()"
        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        indietro
      </button>
      <button
        @click="salvamodifiche()"
        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        salva
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      listastorie: "",
      items: "",
      linkToVid: "",
      titoloVid: "",
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
      this.items.source.push(this.linkToVid);
      this.linkToVid = "";
      this.items.resourceType = true;
      this.items.title.push(this.titoloVid);
      Vue.prototype.$SavedFile.game[this.$numeroquiz] = JSON.parse(
        JSON.stringify(this.items)
      );
    },
  },

  mounted: function () {
    if(Vue.prototype.$SavedFile==null) this.$router.push("Creation");
    this.items = JSON.parse(
      JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz])
    );
    console.log(this.items.image_or_text);
  },
};
</script>
