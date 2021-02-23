<template>
  <div>
    <h1>This is the creation page</h1>
    <button @click="premuto()">premimi</button>
    <div class="space-y-4">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex flex-col sm:items-center sm:space-y-0 sm:space-x-2"
      >
        <div class="flex flex-col">
          <h1>{{ item.domanda }}</h1>
          <input
            type="text"
            name="company_website"
            v-model="item.risposta"
            class="focus:ring-indigo-500 focus:border-indigo-500 rounded sm:text-sm border-2 border-purple-600"
            placeholder="www.example.com"
          />
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
      <button @click="salvamodifiche()">salva modifiche</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      listastorie: "",
      items: [
        { domanda: "qualcosa", risposta: "pompelmo" },
        { domanda: "qualcosa", risposta: "pompelmoneone" },
        { domanda: "qualcosa", risposta: "pompesssssssslmo" },
      ],
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
    salvamodifiche() {
      Vue.prototype.$appName[this.$numerostoria].giochi[
        this.$numeroquiz
      ].modificato = true;
      Vue.prototype.$appName[this.$numerostoria].giochi[
        this.$numeroquiz
      ].option = this.items;
    },
    aggiungidomanda() {
      var a = {
        domanda: "gli aristogatti",
        risposta: "qualcos'altro",
      };
      this.items.push(a);
      console.log(this.items);
    },
  },

  mounted: function () {
    console.log("siamo nella View creationsgame");
    console.log(this.$appName);
    this.items = this.$appName[this.$numerostoria].giochi[
      this.$numeroquiz
    ].option;
  },
};
</script>
