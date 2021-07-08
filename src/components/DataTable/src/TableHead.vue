<template>
  <thead>
  <tr>
    <th v-for="c in columns" :key="c.key">
      <column-head @sort="changeSort" @search="changeSearch" :column="c"/>
    </th>
  </tr>
  </thead>
</template>

<script>
import TableReloadMixin from "./TableReloadMixin";
import ColumnHead       from "./ColumnHead";
import ColumnOptions    from "./helpers/ColumnOptions";

export default {
  name: "TableHead",
  components: {ColumnHead},
  mixins: [TableReloadMixin],
  data() {
    return {searches: {}, sorts: {}}
  },
  methods: {
    changeSearch(key, val) {
      this.searches[key] = val;
      this.searches = Object.fromEntries(Object.entries(this.searches).filter(([k, v]) => v.toString().trim().length > 0));
    },
    changeSort(key, val) {
      this.sorts[key] = val;
      this.sorts = Object.fromEntries(Object.entries(this.sorts).filter(([k,v])=>[1,2].includes(parseInt(v))));
    }
  },
  computed: {
    columns() {
      return this.$parent.$parent.columns.map((c) => {
        let col =
            (
                ({title, key, background, color, searchable, sortable}) =>
                    ({title, key, background, color, searchable, sortable,})
            )(Object.assign({}, ColumnOptions, c));
        if (!col.key) col.key = "th" + Math.floor(Math.random() * 100000);
        return col;
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped></style>
