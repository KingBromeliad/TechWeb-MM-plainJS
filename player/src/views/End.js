const End = Vue.component("End",
{
    template: `<div
    class="bg-fixed bg-center bg-cover bg-no-repeat min-h-screen m-0 p-0"
    v-bind:style="{ 'background-image': background }"
  >
    <div class="grid place-content-center h-screen">
      <h1
        class="text-center lg:text-6xl text-4xl text-black font-extrabold mb-10"
      >
        {{ text }}
      </h1>
      
      <p
        class="text-center lg:text-4xl text-2xl text-gray-800 font-bold mb-60"
      >
        Hai completato la storia e ottenuto: <br />
        {{ punteggioFinale }} punti!
      </p>
    </div>
  </div>`,
    props: {
      data: Object,
      time: String,
      punteggioFinale: Number
    },
    computed: {
      text: function () {
        if (this.data != null) {
          return this.data.text;
        } else return "loading...";
      },
  
      background: function () {
        return "url(" + 'http://localhost:8000/' + this.data.images.background + ")";
      },
    },
    data: function () {
      return {
        playerId: "",
        giocatori: [],
        presiPunti: false,
      };
    },
    methods: {
    },
    sockets: {
      player_points(data) {
        this.giocatori = data;
      },
      get_player_Id(data) {
        console.log(data);
        this.playerId = data;
      },
    },
    mounted: function () {
      this.$socket.client.emit("get_points");
      this.$socket.client.emit("req_player_id");
    },
  }
)