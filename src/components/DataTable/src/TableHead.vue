<template>
  <thead>
  <tr>
    <th v-for="c in columns" :key="'th'+c.key" :class="c.headClass">
      <column-head @checked="(k,v)=>{$emit('checked',k,v);}" @sort="changeSort" @search="changeSearch" :column="c"/>
    </th>
  </tr>
  </thead>
</template>

<script>
import ColumnHead from "./ColumnHead";
import _          from "./../../../helpers";

export default {
  name: "TableHead",
  components: {ColumnHead},
  data() {
    return {searches: {}, sorts: {}}
  },
  methods: {
    changeSearch(key, val) {
      this.searches[key] = val;
      this.searches = Object.fromEntries(Object.entries(this.searches).filter(([k, v]) => v.toString().trim().length > 0));
      this.$mitt.emit('search', this.searches);
    },
    changeSort(key, val) {
      this.sorts[key] = val;
      this.sorts = Object.fromEntries(Object.entries(this.sorts).filter(([k, v]) => [1, 2].includes(parseInt(v))));
      this.$mitt.emit('sort', this.sorts);
    }
  },
  computed: {
    columns() {
      return this.$parent.columns.head;
    },
  },
  mounted() {
    this.$mitt.on('onSort', s => {
      if (!_.isPlainObject(s)) return;
      this.sorts = Object.assign({}, this.sorts, s);
      this.$mitt.emit('sort', this.sorts);
    });
    this.$mitt.on('onSearch', s => {
      if (!_.isPlainObject(s)) return;
      this.searches = Object.assign({}, this.searches, s);
      this.$mitt.emit('search', this.searches);
    });
  },
};
</script>

<style scoped></style>
