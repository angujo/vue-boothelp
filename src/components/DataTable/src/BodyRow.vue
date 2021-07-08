<template>
  <tr>
    <column-cell v-for="e in merge" :key="'td'+e.column.key" v-bind="e"></column-cell>
  </tr>
</template>

<script>
import ColumnCell from "./ColumnCell";

export default {
  name: "BodyRow",
  components: {ColumnCell},
  props: {columns: Array, data: [Array, Object]},
  computed: {
    merge() {
      return this.columns.map((c, i) => {
        return {cellData: this.cleanData[i], column: c};
      });
    },
    cleanData() {
      let dt = !Array.isArray(this.data) ? Object.values(this.data) : this.data;
      if (dt.length > this.columns.length) {
        dt = dt.slice(0, -(dt.length - this.columns.length));
      }
      else if (dt.length < this.columns.length) {
        let diff = this.columns.length - dt.length;
        for (var i = 0; i < diff; i++) {
          dt.push(null);
        }
      }
      return dt;
    }
  }
}
</script>

<style scoped>

</style>