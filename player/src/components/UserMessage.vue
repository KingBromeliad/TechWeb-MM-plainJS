<template>
  <div class="chat-message">
    <div class="flex items-end justify-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end"
      >
        <div>
           <p class="text-blue-700 text-base"> {{ username }} </p>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
            > {{ message }} </span
          >
        </div>
      </div>
      <img
        src="https://avatars.dicebear.com/api/bottts/notmagic.svg"
        alt="My profile"
        class="w-6 h-6 rounded-full order-2"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "userMessage",
  props: {
      username: String,
      message: String,
    }
};
</script>

<style>
</style>
