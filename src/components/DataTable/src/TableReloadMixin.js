export default {
  methods: {
    emitReload() {
      this.$emit("reloadTable");
    },
    emitRefresh() {
      this.$emit("refreshTable");
    },
  },
};
