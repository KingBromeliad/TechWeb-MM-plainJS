<template>
  <div>
    <chat
      @hide-chat="chatActive = !chatActive"
      v-show="chatActive"
      :slideOver="chatActive"
      :admin_name="admin_name"
    ></chat>
    <div class="grid place-items-center w-screen h-screen">
      <div class="flex-col place-content-center h-4/5 w-3/5">
        <div class="flex place-content-center text-center">
          <p class="text-7xl font-semibold">Benvenuto/a, {{ user.name }}</p>
        </div>
        <div
          class="space-y-8 flex-col place-content-center bg-gradient-to-r from-red-200 to-pink-500 rounded-2xl"
        >
          <div class="pt-10 text-center">
            <p class="text-4xl font-medium">Usa le sezioni qui sotto oppure mostrate in alto per navigare le funzionalita'.</p>
            <button
              class="inline-flex justify-center m-3 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="logout()"
            >
              Logout
            </button>
            <a
              href="#"
              @click="chatActive = !chatActive"
              class="inline-flex justify-center m-3 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Chat
            </a>
            <router-link
              href="#"
              to="/valutatore"
              class="inline-flex justify-center m-3 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Valuta una Storia in corso
            </router-link>
            <router-link
              href="#"
              to="/Creation"
              class="inline-flex justify-center m-3 py-2 px-4 border border-transparent shadow-sm text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Crea o modifica una storia
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router";
import chat from "../components/Chat.vue";
export default {
  name: "Profile",
  components: {
    chat,
  },
  data() {
    return {
      user: {
        name: "",
      },
      chatActive: false,
      admin_name: "",
    };
  },
  methods: {
    getUserData: function () {
      let self = this;
      axios
        .get("http://localhost:8000/api/user", { withCredentials: true })
        .then((response) => {
          //console.log(response);
          this.logged = true;
          //console.log(this.logged);
          self.$set(this, "user", response.data.user);
          this.admin_name = response.data.user.username;
        })
        .catch((errors) => {
          console.log(errors);
          router.push("/");
        });
    },
    logout: function () {
      axios
        .get("http://localhost:8000/api/logout", { withCredentials: true })
        .then((response) => {
          this.$set(this, "user", "");
          console.log(response.data);
          this.$emit("logout");
          router.push("/");
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
  mounted() {
    this.getUserData();
  },
  props: {
    logged: Boolean,
  },
};
</script>