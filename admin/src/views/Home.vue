<template>
  <div class="grid place-items-center w-screen h-screen">
    <div class="flex-col place-content-center h-4/5 w-2/5">
      <div class="flex place-content-center text-center">
        <p class="text-7xl font-semibold">Welcome!</p>
      </div>
      <div
        class="space-y-8 flex-col place-content-center bg-gradient-to-r from-red-200 to-pink-500 rounded-2xl"
      >
        <div class="pt-10 text-center">
          <p class="text-4xl font-medium">Accedi per Creare una storia.</p>
        </div>

        <div class="pb-10 flex place-content-center">
          Accedi o registrati con i bottoni nella barra in alto.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
