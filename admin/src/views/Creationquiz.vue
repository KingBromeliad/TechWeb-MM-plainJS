<template>
  <div>
    <div class="space-y-4">
      <div
        v-for="(item, index) in items.domande"
        :key="index"
        class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex flex-col sm:items-center sm:space-y-0 sm:space-x-2"
      >
        <div class="block text-center py-4 space-y-6 sm:items-center">
          <h1>Le risposte</h1>
          <div
            v-for="(item2, index2) in items.domande[index].argomento"
            :key="index2"
            class="flex flex-row"
          >
            <button
              @click="selezionacorretta(index, index2)"
              class="uppercase p-3 flex items-center bg-purple-500 text-blue-50 max-w-max shadow-sm hover:shadow-lg rounded-full w-12 h-12"
            >
              {{ index2 }}
            </button>
            <p
              class="text-purple-500 justify-cente sm:text-sm border-2 border-purple-600r"
              v-if="index2 == items.domande[index].soluzione"
            >
              corretta
            </p>
            <input
              type="text"
              v-model="item.argomento[index2]"
              class="focus:ring-indigo-500 focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
              placeholder="aggiunta"
            />
            <button
              @click="eliminarisposta(index, index2)"
              class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Elimina
            </button>
          </div>
          <button
            @click="aggiungirisposta(index)"
            class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Aggiungi risposta
          </button>
        </div>
        <div class="flex flex-col">
          <h1>La domanda</h1>
          <input
            type="text"
            name="company_website"
            v-model="item.domanda"
            class="focus:ring-indigo-500 focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
            placeholder="inserisci una domanda"
          />
        </div>
        <div class="flex flex-col">
          <button
            @click="eliminadomanda(index)"
            class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Elimina domanda {{ index }}
          </button>
          <div
            v-if="items.images.singleQuestionImage != true"
            class="flex flex-col justify-center"
          >
            <p>aggiungi il personaggio</p>
            <input
              class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              type="file"
              @change="onFileChangedCharacter($event, index)"
            />
          </div>
        </div>
      </div>
      <div
        class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
      >
        <div class="sm:items-center text-center space-y-2">
          <button
            @click="aggiungidomanda()"
            class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          >
            Aggiungi
          </button>
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">
              Aggiungi una domanda al tuo quiz
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-row">
        <button
          class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          @click="salvamodifiche()"
        >
          salva modifiche
        </button>
        <button
          class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          @click="indietro()"
        >
          Indietro
        </button>
        <div class="flex flex-col justify-center">
          <p>aggiungi Background</p>
          <input
            class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            type="file"
            @change="onFileChangedBackground($event)"
          />
        </div>
        <div
          v-if="items.images.singleQuestionImage != false"
          class="flex flex-col justify-center"
        >
          <p>aggiungi il personaggio</p>
          <input
            class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            type="file"
            @change="onFileChangedSingleC($event)"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p>Cambia numero di interlocutori</p>
          <button
            class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            type="file"
            @click="cambiafoto()"
          >
            cambia
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
    eliminarisposta(data, data2) {
      this.items.domande[data].argomento.splice(data2, 1);
    },
    onFileChangedCharacter($event, data) {
      console.log(data);
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      this.items.images.questionImages[data] = event.target.files[0].name;
      axios
        .post("http://localhost:8000/immagineMeglio", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    cambiafoto() {
      this.items.images.singleQuestionImage = !this.items.images
        .singleQuestionImage;
      console.log(this.items.images.singleQuestionImage);
    },
    selezionacorretta(data, data2) {
      this.items.domande[data].soluzione = data2;
      console.log(this.items);
    },
    eliminadomanda(data) {
      this.items.domande.splice(data, 1);
    },
    onFileChangedBackground(event) {
      let formData = new FormData();
      formData.append("image", event.target.files[0]);
      console.log(event.target.files[0].name);
      this.items.images.background[0] = event.target.files[0].name;
      axios
        .post("http://localhost:8000/immagineMeglio", formData)
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
      this.items.images.questionImage = event.target.files[0].name;
      axios
        .post("http://localhost:8000/immagineMeglio", formData)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log("Invalid Data", errors);
        });
    },
    aggiungirisposta(i) {
      this.items.domande[i].argomento.push(" ");
    },
    indietro() {
      this.$router.push("Creationstory");
    },
    salvamodifiche() {
      Vue.prototype.$SavedFile.game[this.$numeroquiz].modificato = true;
      Vue.prototype.$SavedFile.game[this.$numeroquiz] = JSON.parse(
        JSON.stringify(this.items)
      );
    },
    aggiungidomanda() {
      var a = {
        domanda: "un altra domanda",
        soluzione: 1,
        argomento: ["risposta"],
      };
      this.items.domande.push(a);
      console.log(this.items.domande);
    },
  },

  mounted: function () {
    if (Vue.prototype.$SavedFile == null) this.$router.push("Creation");
    console.log("siamo nella quiz creation");
    console.log(this.$numeroquiz);
    this.items = JSON.parse(
      JSON.stringify(Vue.prototype.$SavedFile.game[Vue.prototype.$numeroquiz])
    );
  },
};
</script>
