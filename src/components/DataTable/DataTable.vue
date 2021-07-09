<template>
  <div>
    <table-top :page-sizes="pageSizes"></table-top>
    <html-table :url="sUrl" :data="sData"
                :nonce="(!this.url || this.url.toString().trim().length <= 0) && this.nonceUrl && this.nonceUrl.toString().trim().length"></html-table>
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
  computed: {
    sUrl() {
      return this.url && this.url.toString().trim().length > 0 ? this.url.toString().trim() : (this.nonceUrl && this.nonceUrl.toString().trim().length ? this.nonceUrl.toString().trim() : null);
    },
    sData() {
      return Array.isArray(this.data) && this.data.length ? this.data : null
    }
  }
};
</script>

<style scoped></style>
