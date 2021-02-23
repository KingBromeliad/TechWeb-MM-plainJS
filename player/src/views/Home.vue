<template>
  <body class="bg-gray-900 text-white min-h-screen">
    <div
      v-show="no_game"
      class="grid place-content-center h-screen text-center"
    >
      <h1 class="lg:text-8xl text-6xl font-medium lg:mb-6 mb-3 tracking-wide">
        BENVENUTO
      </h1>
      <p class="lg:text-2xl text-xl font-light text-gray-200 lg:mb-16 mb-10">
        La storia è stata caricata ed è possibile inziare
      </p>
      <h2 class="lg:text-4xl text-2xl font-normal lg:mb-2 m-1">
        Alcune indicazioni:
      </h2>
      <ul
        class="lg:text-2xl text-xl font-thin italic text-gray-300 lg:mb-20 mb-12 space-y-0.5"
      >
        <li>
          Se giochi da dispositivo mobile, ti consigliamo di ruotare il tuo
          dispositivo
        </li>
        <li>
          Sei ora connesso al tuo valutatore, clicca l'icona della chat per
          chiedere aiuto
        </li>
        <li>Divertiti</li>
      </ul>
      <div class="flex justify-center">
        <button
          role="button"
          aria-label="Inizia la Storia"
          @click="ContinueToNext()"
          class="bg-white hover:bg-gray-900 hover:text-white focus:outline-none text-gray-800 font-semibold py-4 px-6 border-white border-2 rounded-md shadow-xl lg:text-6xl text-4xl font-sans tracking-wide"
        >
          START
        </button>
      </div>
    </div>
    <div
      v-show="!no_game"
      class="grid place-content-center h-screen text-center"
    >
      <h1 class="lg:text-8xl text-6xl font-medium lg:mb-6 mb-3 tracking-wide">
        SPIACENTI
      </h1>
      <h2 class="lg:text-4xl text-2xl font-normal lg:mb-2 m-1">
        NESSUNA STORIA ATTIVA AL MOMENTO
      </h2>
      <p class="lg:text-2xl text-xl font-light text-gray-200 lg:mb-16 mb-10">
        attendi l'attivazione delle storie da parte del creatore e ricarica la pagina
      </p>
    </div>
  </body>
</template>

<script>
export default {
  name: "Home",
  props: {
    no_game: Boolean,
  },
  methods: {
    ContinueToNext() {
      this.$emit("gameCompleted");
    },
  },
};
</script>
