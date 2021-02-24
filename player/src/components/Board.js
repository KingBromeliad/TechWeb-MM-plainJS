import Square from './Square.js'

const Board = Vue.component("Board", {
  template: `<div class="board border-solid border-16 border-green-400 shadow-2xl rounded-xl grid grid-cols-1 grid-rows-3 filter-blur" v-if="squares">
    <div v-for="row in 3" :key="row" class="board-row grid grid-cols-3 grid-rows-1">
        <square
            v-for="i in 3"
            :key="indexByRow(i, row)"
            :value="squares[indexByRow(i, row)]"
            :disabled="!!winner"
            :winner="!!winner && winner.includes(indexByRow(i, row))"
            @click="click(i, row)"
        />
    </div>
</div>`,
  props: {
    squares: Array,
    winner: Array,
  },
  components: {
    Square,
  },
  methods: {
    indexByRow(index, row, max = 3) {
      return row * max + index - (max + 1);
    },
    click(index, row) {
      this.$emit("click", this.indexByRow(index, row));
    },
  },
});
export default Board;
