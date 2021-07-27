<template>
  <div class="position-relative">
    <slot/>
    <div v-if="loading" class="p-5 bg-light d-flex justify-content-center align-items-center position-absolute vbh_prog_overlay">
      <span><i class="bi-gear bi-spin"></i> Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressOverlay",
  props: {loading: Boolean}
};
</script>

<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
