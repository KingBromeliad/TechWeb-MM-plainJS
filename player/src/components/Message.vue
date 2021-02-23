<template>
  <div class="chat-message">
    <div class="flex items-end">
      <div
        class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start"
      >
        <div>
            <p class="text-blue-700 text-base"> {{ username }} </p>
          <span
            class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
          >
            {{ message }}
          </span>
        </div>
      </div>
      <img
        src="https://avatars.dicebear.com/api/bottts/magic.svg"
        alt="My profile"
        class="w-6 h-6 rounded-full order-1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
    props: {
      username: String,
      message: String,
    }
};
</script>

<style>
</style>