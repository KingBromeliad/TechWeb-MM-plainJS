<template>
  <div id="app">
    <chat
      @hideChat="chatActive = !chatActive"
      v-show="chatActive"
      :slideOver="chatActive"
      :adminName="adminName"
    ></chat>

    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Icon when menu is closed. -->
              <!--
            Heroicon name: menu

            Menu open: "hidden", Menu closed: "block"
          -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!-- Icon when menu is open. -->
              <!--
            Heroicon name: x

            Menu open: "block", Menu closed: "hidden"
          -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
          >
            <div class="flex-shrink-0 flex items-center">
              <img
                class="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </div>
            <div class="hidden sm:block sm:ml-6" :key="componentToRerender">
              <div class="flex space-x-4">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"
            <a href="#" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
            <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
             -->
                <div id="notLoggedIn" v-show="!this.utenteAccesso()">
                  <router-link
                    href="#"
                    to="/about"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >About</router-link
                  >
                  <router-link
                    href="#"
                    to="/login"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Accedi</router-link
                  >
                  <router-link
                    href="#"
                    to="/register"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Registrati</router-link
                  >
                </div>
                <div id="loggedIn" v-show="this.utenteAccesso()">
                  <router-link
                    href="#"
                    to="/Creation"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Creazione</router-link
                  >
                  <router-link
                    href="#"
                    to="/profile"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Profilo</router-link
                  >
                  <router-link
                    href="#"
                    to="/valutatore"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >Ambiente Valutatore</router-link
                  >
                  <a
                    href="#"
                    @click="chatActive = !chatActive"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
          >
            <!-- Profile dropdown
        <div class="ml-3 relative">
          <div @click="getUserData">
            <button
            @click="dropdown_state = !dropdown_state"
            class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="http://placekitten.com/200/300" alt="">
            </button>
          </div>

          <transition
                enter-active-class="transition ease-out duration-100 transform"
                enter-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75 transform"
                leave-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
          >
          <div
          v-show="dropdown_state"
          class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
            <a href="#/profile" id="linkToProfile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
            <a href="#" @click="logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
          </div>
          </transition>
        </div>
        -->
          </div>
        </div>
      </div>

      <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
      <div class="hidden sm:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a
            href="#"
            class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >Dashboard</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Team</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Projects</a
          >
          <a
            href="#"
            class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Calendar</a
          >
        </div>
      </div>
    </nav>
    <router-view v-bind:logged="this.logged" />
  </div>
</template>

<script>
import chat from "./components/Chat.vue";
export default {
  name: "App",
  components: {
    chat,
  },
  methods: {
    //Metodo per ricavare i dati utente e controllare che sia acceduto
    getUserData: function () {
      this.axios
        .get("http://localhost:3500/api/user", { withCredentials: true })
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
    },
  },
  data: function () {
    return {
      username: "",
      password: "",
      dropdown_state: false,
      componentToRerender: 0,
      logged: false,
      chatActive: false,
      adminName: "",
    };
  },
  mounted() {
    console.log("montato");
  },
};
</script>
