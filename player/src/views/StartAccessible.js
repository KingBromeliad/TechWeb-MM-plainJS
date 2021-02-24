const StartAccessible = Vue.component("StartAccessible", 
{
    template: ` <div
    class="bg-fixed bg-center bg-cover bg-no-repeat min-h-screen m-0 p-0"
    v-bind:style="{ 'background-image': background }"
  >
    <div class="grid place-content-center h-screen">
      <!-- WELCOME INSIDE THE GRID LAYOUT-->
      <div class="flex content-center justify-center flex-wrap space-y-8">
        <div class="rounded-md text-center md:mr-4">
          <p class="text-black font-extrabold md:text-xl md:m-10 sm:m-2" ref="text">
            {{ text }}
          </p>
        </div>

        <button
          ref="button"
          @click="ContinueToNext()"
          class="hover:bg-gray-700 focus:outline-none rounded-lg font-extrabold text-center text-black md:text-6xl sm:text-2xl md:ml-40 sm:ml-10 p-3"
          aria-label="Prosegui con la storia"
        >
          Continua ..
        </button>
      </div>
    </div>
  </div>`,
    props: {
      data: Object,
      time: String,
    },
    computed: {
      text: function() {
        console.log(this.data);
        if (this.data != null) {
          return this.data.text[0];
        } else return "loading...";
      },
  
      background: function() {
        if (this.data.images.background.length == 1)
          return (
            "url(" + 'http://localhost:8000/' + this.data.images.background[0] + ")"
          );
        else
          return (
            "url(" + 'http://localhost:8000/' +
            this.data.images.background[this.line] +
            ")"
          );
      },
      character: function() {
        if (this.data.images.singleCharacter) {
          return 'http://localhost:8000/' + this.data.images.character;
        } else
          return (
            'http://localhost:8000/' + this.data.images.characters[this.line]
          );
      },
    },
    data: function() {
      return {
        line: 0,
        playerId: "",
      };
    },
    methods: {
      //method modified
      ContinueToNext() {
        this.$refs.button.focus();
        this.$emit("game-completed");
      },
      updateScore() {
        //punteggio aggiornato via via passandoli un valore
        let data = {
          playerId: this.playerId,
          nome: this.playerId,
          punteggi: [
            {
              nomeGioco: "intro",
              punti: 1,
              tempo: this.time
            },
          ],
        };
        this.$socket.client.emit("update_score", data);
        this.$emit('update-points', 1);
        //console.log(this.score);
      },
      get_player_Id(data) {
        this.playerId = data;
      },
    },
  }
)
export default StartAccessible