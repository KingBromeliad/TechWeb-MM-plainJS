<template>
  <div
    :class="rotation"
    @click="Selected()"
    class="flex items-center justify-items-center transform"
  >
    <img
      :class="highlight"
      class="object-contain rounded-xl"
      :src="image"
      alt="rock"
    />
  </div>
</template>
<script>
export default {
  name: "rock",
  props: {
    initialAngle: Number,
    rotates: Boolean,
    id: Number,
  },
  data: function() {
    return {
      clicked: true,
      angle: 0,
      rotated: false,
      high_light: false,
    };
  },
  computed: {
    image: function() {
      if (this.id == 1 || this.id == 16)
        return process.env.VUE_APP_BASE_URL + "dinosaurStory/RockArrow.svg";
      else return process.env.VUE_APP_BASE_URL + "dinosaurStory/Rock.png";
    },
    highlight: function() {
      if (this.high_light) return "bg-green-300";
      else return "";
    },
    rotation: function() {
      let x;
      let y;
      y = this.initialAngle + this.angle + 1;
      switch (y) {
        case 0:
          x = "rotate-0";
          break;
        case 1:
          x = "rotate-90";
          break;
        case 2:
          x = "rotate-180";
          break;
        case 3:
          x = "-rotate-90";
          break;
        case 4:
          x = "rotate-0";
      }
      return x;
    },
  },

  methods: {
    Selected() {
      this.Rotate();
      this.high_light = !this.high_light;
      this.$emit("rockClick", this.id, this.high_light);
    },
    Rotate() {
      if (this.rotates && !this.rotated) {
        if (this.clicked) this.angle -= 1;
        else this.angle += 1;
        this.clicked = !this.clicked;
        this.rotated = true;
      }
    },
  },
};
</script>
