<template>
  <div>
    <table-top :page-sizes="pageSizes"></table-top>
    <html-table></html-table>
    <table-footer></table-footer>
  </div>
</template>

<script>
import TableTop    from "./src/TableTop";
import HtmlTable   from "./src/HtmlTable";
import TableFooter from "./src/TableFooter";

export default {
  name: "DataTable",
  components: {TableFooter, HtmlTable, TableTop},
  props: {
    data: {type: Array, default: null},
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    pageSizes: {
      type: Array,
      default() {
        return [];
      },
    },
    url: String,
    nonceUrl: String,
    noSearch: Boolean,
    noPageSize: Boolean,
  },
};
</script>

<style scoped></style>
