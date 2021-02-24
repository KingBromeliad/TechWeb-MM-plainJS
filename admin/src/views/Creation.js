const Creation = Vue.component("Creation", {
    template: `
        <div>
            <div class="space-y-4">
            <div
                v-for="(item, index) in lista"
                :key="index"
                class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
                <div class="text-center space-y-2 sm:text-left">
                <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold">
                    {{ item.name }}
                    </p>
                    <p
                    v-if="item.accessibile != false"
                    class="text-gray-500 font-medium"
                    >
                    accessibile
                    </p>
                    <p v-else class="text-gray-500 font-medium">
                    non accessibile
                    </p>
                </div>
                <button
                    @click="modal3(index)"
                    class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                    opzioni
                </button>
                <button
                    @click="modal(index)"
                    class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                    Elimina
                </button>
                <button
                    @click="rendidisponibile(index)"
                    class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                    Rendi disponibile
                </button>
                </div>
            </div>
            <div
                class="block py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
            >
                <div class="sm:items-center text-center space-y-2">
                <button
                    @click="modal2()"
                    class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >
                    Crea
                </button>
                <div class="space-y-0.5">
                    <p class="text-lg text-black font-semibold">
                    Crea una storia da capo
                    </p>
                    <p class="text-gray-500 font-medium">
                    Crea una storia divertente ed inedita per i tuoi alunni
                    </p>
                </div>
                </div>
            </div>
            </div>
            <div
            class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify center items-center z-50"
            v-if="openmodal3"
            >
            <div
                class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
            >
                <div class="sm:items-center text-center space-y-2">
                <div class="space-y-0.5 flex flex-col">
                    <p class="text-lg text-black font-semibold">
                    Scegli cosa fare con la storia
                    </p>
                    <p class="text-gray-500 font-medium">Tramite il dialogo sotto</p>
                    <div class="flex flex-row">
                    <button
                        @click="duplicastoria()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        duplica
                    </button>
                    <button
                        @click="creazionestoria()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        modifica
                    </button>
                    <button
                        @click="exitmodal()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        annulla
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div
            class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify center items-center z-50"
            v-if="openmodal"
            >
            <div
                class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
            >
                <div class="sm:items-center text-center space-y-2">
                <div class="space-y-0.5 flex flex-col">
                    <p class="text-lg text-black font-semibold">
                    sei sicuro di voler eliminare la storia?
                    </p>
                    <p class="text-gray-500 font-medium">
                    Non sarà possibile recuperarla
                    </p>
                    <div class="flex flex-row">
                    <button
                        @click="eliminastoria()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        elimina
                    </button>
                    <button
                        @click="exitmodal()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        annulla
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div
            class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify center items-center z-50"
            v-if="openmodal2"
            >
            <div
                class="block py-16 px-8 mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center"
            >
                <div class="sm:items-center text-center space-y-2">
                <div class="space-y-0.5 flex flex-col">
                    <div class="flex flex-col">
                    <h3>nome della storia</h3>
                    <input
                        type="text"
                        class="px-10 py-2 text-sm text-center text-purple-600 font-semibold rounded-full border border-purple-200"
                        v-model="storyname"
                        placeholder="inserisci un nome"
                    />
                    </div>
                    <div class="flex flex-col">
                    <h3>Definisci l'accessibilità</h3>
                    <button
                        @click="definisciaccesibile()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        {{parolamagica}}
                    </button>
                    </div>
                    <p class="text-lg text-black font-semibold">
                    Crea una nuova storia
                    </p>
                    <div class="flex flex-row justify-centr">
                    <button
                        @click="creazionestorianuova()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        Crea
                    </button>
                    <button
                        @click="exitmodal()"
                        class="px-16 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    >
                        annulla
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div
            v-if="openmodal || openmodal2 || openmodal3"
            class="absolute h-full inset-0 z-40 opacity-25 bg-black"
            ></div>
        </div>`,
    data: function () {
        return {
            parolamagica: "accessibile",
            openmodal3: "",
            storyname: "ddd",
            storiadaeliminare: 0,
            storiadamodificare: 0,
            accesibilita: true,
            openmodal: false,
            openmodal2: false,
            jsoncreato: "",
            name: "cagnolinonononoe",
            listastorie: "",
            items: "",
            lista: [
                {
                    name: "clausoladdddddddddddddd",
                    edizione: "ciaolo",
                },
                {
                    name: "clausola",
                    edizione: "ciaolo",
                },
                {
                    name: "clausola",
                    edizione: "ciaolo",
                },
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
            console.log("ciao");
        },
        definisciaccesibile() {
            this.accessibilita = !this.accessibilita;
            console.log(this.accessibilita);
            if (this.accessibilita == true) {
                this.parolamagica = "accessibile";
            } else {
                this.parolamagica = "non accessibile";
            }
            console.log(this.parolamagica);
        },
        modal(data) {
            console.log("modal aperto stronzetto");
            this.openmodal = true;
            this.storiadaeliminare = data;
        },
        modal2() {
            console.log("modal aperto stronzetto");
            let numero = this.lista.length + 1;
            this.accessibilita = true;
            this.storyname = "Storia numero " + numero;
            this.numerofascia = 0;
            this.numerocategoria = 0;
            this.openmodal2 = true;
        },
        exitmodal() {
            this.openmodal = false;
            this.openmodal2 = false;
            this.openmodal3 = false;
        },

        modal3(data) {
            Vue.prototype.$numerostoria = data;
            this.storiadamodificare = data;
            this.openmodal3 = true;
        },
        eliminastoria() {
            let filejson = this.lista[this.storiadaeliminare].name;
            this.lista.splice(this.storiadaeliminare, 1);
            this.openmodal = false;
            this.invialistastoria();
            this.axios
                .post("http://localhost:3500/deleteStory", {
                    filejson,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        creazionestoria() {
            let name = this.lista[this.storiadamodificare].name;
            this.vaialcreator(name);
        },

        duplicastoria() {
            let nomenuovo = this.lista[this.storiadamodificare].name;
            let ac = this.lista[this.storiadamodificare].accessibile;
            console.log(nomenuovo);
            let a = {
                accessibile: ac,
                name: nomenuovo + " nuovo",
                edizione: "ciaolo",
            };
            this.lista.push(a);
            console.log(this.lista);
            let filejson = this.lista;
            this.axios
                .post("http://localhost:3500/writeStoryList", {
                    filejson,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            this.axios
                .get("http://localhost:3500/prendiStoria", {
                    params: {
                        NAME: nomenuovo,
                    },
                })
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.namestory);
                    this.jsoncreato = response.data;
                    console.log("il nome nuovo" + nomenuovo);
                    this.jsoncreato.namestory = nomenuovo + " nuovo";
                    let filejson = this.jsoncreato;
                    console.log(filejson);
                    this.axios
                        .post("http://localhost:3500/writeStory", {
                            filejson,
                        })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch((errors) => {
                    console.log(errors);
                });
            this.openmodal3 = false;
        },

        creazionestorianuova() {
            let a = {
                accessibile: this.accessibilita,
                name: this.storyname,
                edizione: "ciaolo",
            };
            Vue.prototype.$numerostoria = this.lista.length;
            this.lista.push(a);
            this.invialistastoria();
            this.axios
                .get("http://localhost:3500/prendiStoria", {
                    params: {
                        NAME: "Default",
                    },
                })
                .then((response) => {
                    this.jsoncreato = response.data;
                    console.log(response.data);
                    this.jsoncreato.namestory = this.storyname;
                    this.jsoncreato.accessibile = this.accessibilita;
                    Vue.prototype.$SavedFile = this.jsoncreato;
                    this.$router.push("Creationstory");
                    let filejson = this.jsoncreato;
                    this.axios
                        .post("http://localhost:3500/writeStory", {
                            filejson,
                        })
                        .then(function (response) {

                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                })
                .catch((errors) => {
                    console.log(errors);
                });
        },
        vaialcreator(data) {
            this.axios
                .get("http://localhost:3500/prendiStoria", {
                    params: {
                        NAME: data,
                    },
                })
                .then((response) => {
                    Vue.prototype.$SavedFile = response.data;
                    this.$router.push("Creationstory");
                    console.log(response);
                })
                .catch((errors) => {
                    console.log(errors);
                });
        },
        invialistastoria() {
            let filejson = JSON.parse(JSON.stringify(this.lista));
            this.axios
                .post("http://localhost:3500/writeStoryList", {
                    filejson,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        getStory() {
            this.axios
                .get("http://localhost:3500/SendStory")
                .then((response) => {
                    console.log(response.data);
                    this.lista = response.data;
                })
                .catch((errors) => {
                    console.log(errors);
                });
        },
        rendidisponibile(data) {
            let cambio = this.lista[data].name;
            this.$socket.client.emit("caricastoria", cambio);
        },
    },
    mounted: function () {
        this.axios
            .get("http://localhost:3500/api/user", { withCredentials: true })
            .then((response) => {
                return response;
            })
            .catch((errors) => {
                console.log(errors);
                router.push("/login");
            });
        this.getStory();
    },
});
export default Creation