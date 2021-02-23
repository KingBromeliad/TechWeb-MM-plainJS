<template>
  <body
    class="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen"
    v-bind:style="{ 'background-image': background }"
  >
    <section v-show="!quizCompleted" class="text-gray-600 body-font">
      <div class="grid place-content-center h-screen">
        <div
          class="flex justify-center"
          role="img"
          aria-labelledby="immagine di background"
        >
          <img
            class="object-contain object-center rounded"
            alt=""
            :src="questionImage"
            style="height: 30vh"
          />
        </div>

        <h1
          class="title-font lg:text-6xl text-3xl mb-4 font-medium text-gray-900 text-center"
        >
          {{ domande[currentQuestion].domanda }}
        </h1>

        <div
          class="container flex flex-row items-center justify-center"
          aria-live="polite"
          aria-atomic="true"
        >
          <div
            v-for="(option, index) in domande[currentQuestion].argomento"
            :key="index"
            class="flex flex-row lg:p-4 p-2 bg-white rounded-xl shadow-md m-4"
          >
            <label
              class="flex items-center space-x-3"
              :for="index"
              aria-labelledby="Indice delle risposte"
            >
              <input
                checked
                type="radio"
                :id="index"
                :value="index"
                v-model="answer"
                class="form-tick lg:h-6 lg:w-6 h-4 w-4 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
              />
              <span class="text-gray-900 text-s font-medium">{{ option }}</span>
            </label>
          </div>
        </div>
        <div class="flex justify-center" role="button">
          <!--<button
              class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            >
              Button
            </button>-->
          <button
            @click="nextQuestion()"
            role="button"
            aria-live="polite"
            aria-atomic="true"
            aria-label="Passa alla domanda successiva"
            v-if="currentQuestion < data.domande.length - 1"
            class="ml-4 inline-flex text-black bg-blue-300 border-0 py-2 px-8 focus:outline-none hover:bg-blue-500 rounded-md text-2xl font-bold"
          >
            Successiva
          </button>
          <button
            role="button"
            aria-label="Completa il Quiz"
            v-if="currentQuestion == data.domande.length - 1"
            @click="checkAnswers()"
            class="ml-4 inline-flex text-black bg-green-300 border-0 py-2 px-8 focus:outline-none hover:bg-green-500 rounded-md text-2xl font-bold"
          >
            Completa
          </button>
        </div>
      </div>
    </section>

    <section v-show="quizCompleted">
      <div class="grid place-content-center text-center h-screen">
        <h1
          class="text-white lg:text-8xl text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl lg:p-4 p-2 m-1"
        >
          COMPLIMENTI!
        </h1>
        <p class="text-black lg:text-8xl text-4xl font-medium lg:p-4 p-2">
          Hai ottenuto: <br />{{ this.punti + "" }} Punti
        </p>
        <div class="flex justify-center">
          <button
            @click="ContinueToNext()"
            class="bg-black hover:bg-gray-700 focus:outline-none rounded-lg font-bold text-center text-white md:text-2xl sm:text-xl p-2 mt-4"
            role="button"
            aria-label="Continua alla sezione successiva"
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  </body>
</template>
<script>
export default {
  name: "Question",
  props: {
    data: Object,
    time: String,
  },
  computed: {
    questionImage: function () {
      if (this.data.images.singleQuestionImage)
        return process.env.VUE_APP_BASE_URL + this.data.images.questionImage;
      else
        return (
          process.env.VUE_APP_BASE_URL +
          this.data.images.questionImages[this.currentQuestion]
        );
    },
    domande: function () {
      return this.data.domande;
    },
    background: function () {
      return (
        "url(" +
        process.env.VUE_APP_BASE_URL +
        this.data.images.background +
        ")"
      );
    },
  },
  data: function () {
    return {
      currentQuestion: 0,
      answers: [],
      answer: "",
      punti: 0,
      playerId: "",
      quizCompleted: false,
    };
  },
  methods: {
    ContinueToNext() {
      this.$emit("gameCompleted");
    },
    updateScore() {
      //punteggio aggiornato via via passandoli un valore
      let data = {
        playerId: this.playerId,
        nome: this.playerId,
        punteggi: [
          {
            nomeGioco: "Quiz",
            punti: this.punti,
            tempo: this.time,
          },
        ],
      };
      this.$socket.client.emit("update_score", data);
      this.$emit("updatePoints", this.punti);
    },
    nextQuestion() {
      if (this.answer == this.domande[this.currentQuestion].soluzione)
        this.punti += 25;
      else this.punti += 5;
      this.currentQuestion++;
    },
    checkAnswers: function () {
      if (this.answer == this.domande[this.currentQuestion].soluzione)
        this.punti += 25;
      else this.punti += 5;
      this.quizCompleted = true;
      this.updateScore();
    },
  },
  sockets: {
    req_player_id(data) {
      this.playerId = data;
    },
  },
};
</script>
