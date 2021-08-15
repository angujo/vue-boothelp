<template>
  <img :src="path" :alt="alt" :class="['img-fluid vbhi_square',cirClass]"
       :style="{width:width?width+'rem':null,height:height?height+'rem':null}" v-if="path">
</template>

<script>
import _ from './../../helpers';

export default {
  name: "Imager",
  props: {
    src: {type: [String, Object], require: true},
    alt: String,
    square: Boolean,
    circle: Boolean,
    banner: Boolean,
    rectangle: Boolean,
    longRectangle: Boolean,
    extraSmall: Boolean,
    small: Boolean,
    large: Boolean,
    medium: Boolean,
    extraLarge: Boolean,
    iWidth: {type: [String, Number], default: null},
  },
  data() {return {path: null}},
  methods: {
    getPath() {
      if (_.isString(this.src)) {
        this.path = this.src;
        return;
      }
      if (!this.src instanceof File) return;
      let FR = new FileReader(), vm = this;
      FR.onload = function (e) {
        //if you want to display it somewhere in your previewTemplate
        vm.path = e.target.result
        // temp.find('.my-preview').attr('src',); //setting as src of some img tag with class 'my-preview'
      };
      FR.readAsDataURL(vm.src);
    }
  },
  computed: {
    cirClass() { return this.circle ? 'rounded-circle' : null; },
    sqClass() { return this.square ? 'ratio ratio-1x1' : null; },
    rctClass() { return this.rectangle ? 'ratio ratio-4x3' : null;},
    lngClass() { return this.longRectangle ? 'ratio ratio-16x9' : null;},
    banClass() { return this.banner ? 'ratio ratio-21x9' : null;},
    width() { return this.extraLarge ? 20 : (this.large ? 12 : (this.medium ? 7 : (this.small ? 3 : (this.extraSmall ? 1.5 : parseFloat(this.iWidth)))))},
    height() {
      if (this.circle || this.square) return 0 + this.width;
      if (this.rectangle) return (3 / 4) * this.width;
      if (this.longRectangle) return (9 / 16) * this.width;
      if (this.banner) return (9 / 21) * this.width;
      return null;
    },
  },
  watch: {src(v) {this.getPath();}},
  mounted() {this.getPath();}
};
</script>

<style scoped>
.vbhi_square {
  object-fit: cover;
}
</style>
