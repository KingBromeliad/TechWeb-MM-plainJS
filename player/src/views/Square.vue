<template>
  <button class="square text-8xl bg-white border-white border-solid border leading-8 font-bold p-0 text-center" :class="[ value, { 'winner': winner } ]"
    :disabled="disabled" @click="click">{{value}}</button>
</template>

<script>
export default {
  name: 'Square',
  props: {
    value: String,
    winner: Boolean,
    disabled: Boolean
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.square {
  background-blend-mode: exclusion;
  box-shadow: inset 0 0 0 #0004;
  text-shadow: -1px -1px 1px #000b, -1px 1px 1px #000b, 1px -1px 1px #000b, 1px 1px 1px #000b;
  transition: all .25s ease;
  outline: none;
}
.square.winner {
  background: #8885;
}
.square:not([disabled]):empty:hover,
.square:not([disabled]):empty:focus {
  box-shadow: inset 0 2px 25px #0006;
  cursor: pointer;
}
.square:not([disabled]):empty:active {
  box-shadow: inset 0 2px 50px #0008;
}
.square.X {
  color: #ff5722;
}
.square.O {
  color: #ffeb3b;
}
</style>