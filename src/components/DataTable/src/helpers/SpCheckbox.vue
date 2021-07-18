<template>
  <label style="margin: 0"><input type="checkbox" v-model="checked">
    <slot/>
  </label>
</template>

<script>
export default {
  name: "SpCheckbox",
  props: {initValue: Boolean},
  data() {
    return {checked: this.initValue}
  },
  methods: {
    setCheck(v) {
      if (false !== v && true !== v) return;
      this.checked = v;
    },
    sendAction(v) {
      v = v || this.checked;
      this.$emit('checked', v);
    }
  },
  watch: {
    checked(v) {
      this.sendAction(v);
    }
  }
}
</script>

<style scoped>

</style>