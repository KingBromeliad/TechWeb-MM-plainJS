const Square = Vue.component("Square", 
{
    template: `<button class="square text-8xl bg-white border-white border-solid border leading-8 font-bold p-0 text-center" :class="[ value, { 'winner': winner } ]"
    :disabled="disabled" @click="click">{{value}}</button>`,
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
)
export default Square