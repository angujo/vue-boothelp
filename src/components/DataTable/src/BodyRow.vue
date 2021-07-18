<template>
  <tr @click="onClick" :class="rowClass">
    <column-cell v-for="e in merge" :key="'td'+rId+e.column.key" v-bind="e" :index="rowNumber" :data-index="dataIndex" :row-id="rId">
      <template v-if="e.column.slot" v-slot:[e.column.slot]="slotData">
        <slot :name="e.column.slot" v-bind="slotData"/>
      </template>
    </column-cell>
  </tr>
</template>

<script>
import ColumnCell from "./ColumnCell";
import _          from './../../../helpers';

export default {
  name: "BodyRow",
  components: {ColumnCell},
  props: {columns: Array, data: [Array, Object], index: Number, count: Number, page: Number},
  data() {
    return {rowClass: null}
  },
  methods: {
    onClick() {
      this.$mitt.emit('onRowClick', {d: this.data, i: this.index});
    }
  },
  computed: {
    rId() {
      return _.mathRand('tr');
    },
    dataIndex() {
      return ((this.page - 1) * this.count) + this.index + 1;
    },
    rowNumber() {
      return this.index + 1;
    },
    merge() {
      return this.columns.map((c, i) => {
        return {cellData: Array.isArray(this.cleanData) ? this.cleanData[i] : this.cleanData, column: c};
      });
    },
    cleanData() {
      if (!Array.isArray(this.data)) return this.data;
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
  },
  mounted() {
    this.$mitt.on('rowClassed', cls => {
      if (_.isPlainObject(cls) && cls.id === this.rId) this.rowClass = cls.class;
    });
  }
}
</script>

<style scoped>

</style>