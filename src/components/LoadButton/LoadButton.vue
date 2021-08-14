<template>
  <button :type="type" :disabled="busy">
    <slot name="busy" v-if="busy"><i class="bi-gear bi-spin"/> <span v-if="!noBusyText">Wait...</span></slot>
    <slot v-else>#loadButton</slot>
  </button>
</template>

<script>
export default {
  name: "ProgressOverlay",
  props: {
    busy: Boolean,
    type: {type: String, default: 'button'},
    noBusyText: Boolean
  }
};
</script>

<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
}
</style>
