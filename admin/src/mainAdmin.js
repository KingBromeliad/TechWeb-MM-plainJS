import Chat from "./components/Chat.js";
import Creation from "./views/Creation.js";
import Creationend from "./views/Creationend.js";
import Creationimage from "./views/Creationimage.js";
import CreationQrGame from "./views/CreationQrGame.js";
import Creationquiz from "./views/Creationquiz.js";
import Creationsgame from "./views/Creationsgame.js";
import Creationstart from "./views/Creationstart.js";
import Creationstartaccessibile from "./views/Creationstartaccessibile.js";
import Creationstory from "./views/Creationstory.js";
import Creationtris from "./views/Creationtris.js";
import Creationvideo from "./views/Creationvideo.js";
import HomeAdmin from "./views/HomeAdmin.js";
import Login from "./views/Login.js";
import Profile from "./views/Profile.js";
import Register from "./views/Register.js";
import SchermataValutazione from "./views/SchermataValutazione.js";

var socket = io("http://localhost:8000/", {
  extraHeaders: {
    "cors-header": "valid"
  }
})

Vue.use(VueSocketIOExt, socket);


const routes = [
  {
    path: '/',
    name: 'HomeAdmin',
    component: HomeAdmin
  },
  {
    path: '/creation',
    name: 'Creation',
    component: Creation
  },
  {
    path: '/creationend',
    name: 'Creationend',
    component: Creationend
  },
  {
    path: '/creationimage',
    name: 'Creationimage',
    component: Creationimage
  },
  {
    path: '/creationvideo',
    name: 'Creationvideo',
    component: Creationvideo
  },
  {
    path: '/creationtris',
    name: 'Creationtris',
    component: Creationtris
  },
  {
    path: '/creationstart',
    name: 'Creationstart',
    component: Creationstart
  },
  {
    path: '/creationsgame',
    name: 'Creationsgame',
    component: Creationsgame
  },
  {
    path: '/creationquiz',
    name: 'Creationquiz',
    component: Creationquiz
  },
  {
    path: '/creationstory',
    name: 'Creationstory',
    component: Creationstory
  },
  {
    path: '/creationstartaccessibile',
    name: 'CreationStartAccessibile',
    component: Creationstartaccessibile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/valutatore',
    name: 'SchermataValutazione',
    component: SchermataValutazione
  },
  {
    path: '/creationQrGame',
    name: 'CreationQrGame',
    component: CreationQrGame
  },
];

const router = new VueRouter({
  routes, // short for `routes: routes`
});

Vue.use(router);

new Vue({
  el: "#app",
  components: {
    Chat,
  },
  provide: {
    logged: false
  },
  methods: {
    //Metodo per ricavare i dati utente e controllare che sia acceduto
    getUserData: function () {
      axios
        .get("http://localhost:8000/api/user", { withCredentials: true })
        .then((response) => {
          this.username = response.data.username;
          this.password = response.data.password;
          this.logged = true;
          //console.log(response.headers);
          return response;
          //console.log(this.logged);
        })
        .catch((errors) => {
          this.logged = false;
          return errors;
        });
    },
    //Metodo per aggiornare i bottoni della navbar
    utenteAccesso: function () {
      this.getUserData();
      //console.log(this.logged);
      return this.logged;
    },
    logout: function () {
      this.logged = false;
      this.$router.push('/');
    },
    login: function () {
      this.logged = true;
      this.$router.push('/profile');
    },
    register: function () {
      this.$router.push('/login');
    },
    go_to_creationstory: function () {
      this.$router.push('/creationstory');
    },
    go_to_creation: function () {
      this.$router.push('/creation');
    },
    go_to_modifica: function (data) {
      this.$router.push(data);
    }
  },
  data: function () {
    return {
      username: "",
      password: "",
      dropdown_state: false,
      componentToRerender: 0,
      logged: false,
      chat_active: false,
      adminName: ""
    };
  },
  mounted() {
    console.log("montato");
  },
  router
}).$mount()
