<template>
  <div
  v-if="items!=null"
   class="justify justify-center space-y-4">
    <h1>This is the creation page</h1>
    <button @click="premuto()">premimi</button>
    <div class="flex flex-row justify-center">
    <div
      class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
    >
      <div class="sm:items-center text-center space-y-2">
        <div class="space-y-0.5 flex flex-col">
          <p class="text-lg text-black font-semibold">
            Aggiungi le frasi del testo
          </p>
          <p class="text-gray-500 font-medium">
            Qua potrai aggiungere il testo che vuoi
          </p>
          <div
            v-for="(item, index) in items.text"
            :key="index"
            class="flex flex-row"
          >
          <div class="flex row">
        <input
        type="text"
        v-model="items.text[index]"
        class="focus:ring-indigo-500 w-full focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
        placeholder="aggiungi testo"
        />
        <button
          @click="eliminatesto(index)"
          class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >elimina </button>
        <input
        v-if="items.images.singleCharacter!=true"
        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        type="file" @change="onFileChanged($event,index)">
        </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
    >
      <div class="sm:items-center text-center space-y-2">
        <div class="space-y-0.5 flex flex-col">
          <p class="text-lg text-black font-semibold">
            Aggiungi le risposte
          </p>
          <p class="text-gray-500 font-medium">
            Qua potrai aggiungere le risposte
          </p>
          <div
            v-for="(item, index) in items.option"
            :key="index"
            class="flex flex-row"
          >
          <div class="flex row">
  <input
    type="text"
    v-model="items.option[index]"
    class="focus:ring-indigo-500 w-full focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
    placeholder="aggiungi testo"
  />
  <button
    @click="eliminarisposta(index)"
    class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
  >elimina </button>
</div>
          </div>
        </div>
      </div>
  </div>
</div>
<div class="flex flex-row">
  <div class="flex flex-col">
<button
  @click="aggiungitesto()"
  class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
>
Aggiungi linea di dialogo
</button>
</div>
<div class="flex flex-col">
  <p> seleziona background</p>
<input
class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
type="file" @change="onFileChangedBackground($event)">
</div>
<div
v-if="items.images.singleCharacter!=false"
 class="flex flex-col">
  <p> seleziona personaggio</p>
<input
class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
type="file" @change="onFileChangedSingleC($event)">
</div>
<div
 class="flex flex-col">
 <button
 v-if="items.images.singleCharacter!=false"
   @click="numeroimmagini()"
   class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
 >
 Immagini multiple
</button>
<button
v-else
  @click="numeroimmagini()"
  class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
>
 Immagine singola
</button>
</div>
<div
 class="flex flex-col">
 <button
   @click="salvamodifiche()"
   class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
 >
 salva
</button>
</div>
<div class="flex flex-col">
 <button
   @click="indietro()"
   class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
 >
 indietro
</button>
</div>
</div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      selectedFile:null,
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
    premuto() {
      console.log("mi hai premuto, ahia");
    },

    eliminarisposta(data) {
      this.items.option.splice(data,1);
      this.items.text.splice(data,1);
    },
    aggiungitesto() {
      this.items.text.push("testo");
      this.items.option.push("testo");
    },
    eliminatesto(data) {
      this.items.text.splice(data,1);
      this.items.option.splice(data,1);
    },

    numeroimmagini() {
      if(this.items.images.singleCharacter==true) {
        this.items.images.singleCharacter=false;

      } else {
        this.items.images.singleCharacter=true;
        this.items.images.character="dinosaurStory/Dino1.svg";
      }

    },

    onFileChangedBackground(event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.background.pop();
      this.items.images.background.push(event.target.files[0].name);
      this.axios
        .post("http://localhost:3500/immagineMeglio", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    onFileChangedSingleC(event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.character=event.target.files[0].name;
      this.axios
        .post("http://localhost:3500/immagineMeglio", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    onFileChanged (event, data) {
      console.log(data);
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.characters[data]=event.target.files[0].name;
      console.log(this.items.images.characters[data]);
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
      Vue.prototype.$SavedFile.game[this.$numeroquiz] = JSON.parse(JSON.stringify(this.items));
    }
  },

  mounted: function () {
    if(Vue.prototype.$SavedFile==null) this.$router.push("Creation");
    console.log("siamo nella start cration");
    console.log(this.$numeroquiz);
    console.log(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz].option);
    this.items = JSON.parse(JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz]));
  },
};
</script>
