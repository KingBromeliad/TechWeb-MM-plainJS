const Chat = Vue.component("Chat", {
  name: "chat",
  template: ` <div class="fixed inset-0 overflow-hidden z-10">
    <div class="absolute inset-0 overflow-hidden">
      <transition
        enter-active-class="ease-in-out duration-500"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-500"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="slideOver"
          class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>

      <transition
        enter-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transform transition ease-in-out duration-500 sm:duration-700"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <section
          v-show="slideOver"
          class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
          aria-labelledby="slide-over-heading"
        >
          <div class="relative w-screen max-w-md">
            <div
              class="h-full flex flex-col py-6 bg-white shadow-xl overflow-scroll"
            >
              <div
                class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen"
              >
                <div class="flex items-center space-x-4">
                  <img
                    src="https://avatars.dicebear.com/api/bottts/magic.svg"
                    alt=""
                    class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                  />
                  <div class="flex flex-col leading-tight">
                    <div class="text-2xl mt-1 flex items-center">
                      <span class="text-gray-700 mr-3">Chiedi Aiuto</span>
                      <span class="text-green-500">
                        <svg width="10" height="10">
                          <circle
                            cx="5"
                            cy="5"
                            r="5"
                            fill="currentColor"
                          ></circle>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  id="messages"
                  class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                  <div v-for="(incomingFeed, index) in this.feed" :key="index">
                    <Message
                      v-if="
                        incomingFeed.username != 'You' &&
                        incomingFeed.incomingMessage != ''
                      "
                      :message="incomingFeed.incomingMessage"
                      :username="incomingFeed.username"
                      aria-label="messaggio"
                    >
                    </Message>

                    <userMessage
                      v-else
                      :message="incomingFeed.incomingMessage"
                      :username="incomingFeed.username"
                    >
                    </userMessage>
                  </div>
                </div>
                <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                  <div class="relative flex">
                    <input
                      v-model="userMessage"
                      aria-label="scrivi il messaggio"
                      ref="textbox"
                      role="textbox"
                      type="text"
                      class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
                      v-on:keyup.enter="sendMessage()"
                    />
                    <div
                      class="absolute right-0 items-center inset-y-0 hidden sm:flex"
                    >
                      <button
                        aria-label="Invia il messaggio"
                        type="button"
                        role="button"
                        ref="button"
                        @click="sendMessage()"
                        class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          class="h-6 w-6 transform rotate-90"
                        >
                          <path
                            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </transition>
    </div>
  </div>`,
  components: {
    Message,
    userMessage,
  },
  props: {
    slideOver: Boolean,
  },
  sockets: {
    connect() {
      console.log("connected");
    },
    welcome_message(data) {
      let incomingData = {
        username: data.username,
        incomingMessage: data.text,
      };
      //console.log(incomingData.username);
      this.feed.push(incomingData);
    },
    send_player(data) {
      let incomingData = {
        username: data.username,
        incomingMessage: data.text,
      };
      console.log(incomingData.username);
      this.feed.push(incomingData);
    },
    user_disconnect(data) {
      let incomingData = {
        username: data.username,
        incomingMessage: data.text,
      };
      this.feed.push(incomingData);
    },
  },
  created() {
    this.$refs.input.focus();
    this.$refs.button.focus();
  },

  methods: {
    sendMessage: function () {
      this.$socket.client.emit("player_message", this.userMessage);
      let sentMessage = {
        username: "You",
        incomingMessage: this.userMessage,
      };
      this.feed.push(sentMessage);
      this.userMessage = "";
    },
  },
  data: function () {
    return {
      feed: [],
      userMessage: "",
      playerName: "",
    };
  },
});
