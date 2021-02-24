const Register = Vue.component("Register", {
    template: `
        <div>
            <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div
                class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2"
            >
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 class="mb-8 text-3xl text-center">Registrati</h1>
                <form action="#" method="POST" v-on:submit="signUp">
                    <input
                    type="text"
                    id="name"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="fullname"
                    placeholder="Nome"
                    required
                    />
                    <input
                    type="text"
                    id="username"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="username"
                    placeholder="Username"
                    required
                    />

                    <input
                    type="password"
                    id="pass"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                    required
                    />
                    <input
                    type="password"
                    class="block border border-grey-light w-full p-3 rounded mb-4"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Confirm Password"
                    required
                    />

                    <button
                    type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Crea Account
                    </button>
                </form>
                </div>

                <div class="text-grey-dark mt-6">
                Already have an account?
                <a
                    class="no-underline border-b border-blue text-blue"
                    href="#/login/"
                >
                    Log in </a
                >.
                </div>
            </div>
            </div>
        </div>
    `,
    methods: {
        signUp: (e) => {
            e.preventDefault();
            var name = document.getElementById("name").value;
            var username = document.getElementById("username").value;
            var password = document.getElementById("pass").value;
            var confirmPass = document.getElementById("confirm_password").value;
            //console.log(name + username + password);
            if (password == confirmPass) {
                axios
                    .post("http://localhost:3500/api/register", {
                        name,
                        username,
                        password,
                    })
                    .then(function (response) {
                        console.log(response);
                        console.log("hello");
                        router.push("/login");
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                alert("Le password devono essere uguali!");
            }
        },
    },
});
export default Register