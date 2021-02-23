<template>
  <div
    class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
  >
<div class="flex flex-col text-center space-y-2 sm:text-left">
  <div class="space-y-0.5">
    <p class="text-lg text-black font-semibold">
      Aggiungi un background
    </p>
    <p  class="text-gray-500 font-medium">
      seleziona un file nel tuo pc per la tua storia
    </p>
  </div>
  <div  class="flex flex-col">
    <p> seleziona background</p>
  <input
  class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600"
  type="file"  @change="onFileChangedBackground($event)">
  </div>
  <div class=" flex flex-col space-y-0.5">
    <p class="justify-center text-lg text-black font-semibold">
      Decidi cosa richiedere al giocatore
    </p>
    <p v-if="items.image_or_text!=true"
      class="justify-center text-gray-500 font-medium">
      richiedi un immagine
    </p>
    <p v-if="items.image_or_text!=false"
      class="text-gray-500 font-medium">
      richiedi testo
    </p>
  <button
    @click="cambia()"
    class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
  >
  Cambia
 </button>
</div>
  <button
    @click="indietro()"
    class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
  >
  indietro
 </button>
 <button
   @click="salvamodifiche()"
   class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
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
    premuto() {
      console.log("mi hai premuto, ahia");
    },
    onFileChangedBackground(event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.background=event.target.files[0].name;
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
    cambia() {
      this.items.image_or_text= !this.items.image_or_text;
    },
    salvamodifiche() {
      Vue.prototype.$SavedFile.game[this.$numeroquiz] = JSON.parse(JSON.stringify(this.items));
      console.log(this.items);
    }
  },

  mounted: function () {
    console.log("siamo nella image cration");
    this.items = JSON.parse(JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz]));
    console.log(this.items.image_or_text);
  },
};
</script>
