const Login = Vue.component("Login", {
    template: `
        <div
            class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
            v-show="!logged"
        >
            <div class="max-w-md w-full space-y-8">
                <div>
                    <img
                        class="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                </h2>
                </div>
                <form class="mt-8 space-y-6" action="#" method="POST" v-on:submit="login">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="username" class="sr-only">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autocomplete="username"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember_me"
                            name="remember_me"
                            type="checkbox"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                            Remember me
                    </label>
                    </div>

                    <div class="text-sm">
                        Non hai un account?
                    <router-link
                            to="/register"
                            class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Registrati.
                    </router-link>
                    </div>
                </div>

                <div>
                    <input
                        type="submit"
                        value="Sign In"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />
                </div>
            </form>
        </div>
        </div >
    `,
    
    methods: {
        login: function (e) {
            e.preventDefault();
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let login = () => {
                let data = {
                    username: username,
                    password: password,
                };
                axios
                    .post("http://localhost:8000/api/login", data, {
                        withCredentials: true,
                    })
                    .then((response) => {
                        console.log(response.data);
                        this.$emit("login");
                    })
                    .catch((errors) => {
                        alert("Username o password sbagliati!");
                        console.log("Cannot login " + errors);
                    });
            };
            login();
        },
    },
    props: {
        logged: Boolean,
    },
});
export default Login