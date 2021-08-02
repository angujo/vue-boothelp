<template>
  <div class="dt_wrapper">
    <table-top :page-sizes="pageSizes" @onCount="c=>{count=c;}"></table-top>
      <html-table :data="sData" ref="httble" :count="count" :page="page" @onTotal="t=>{total=t;}">
       <template v-for="(_, scopedSlotName) in cellSlots" v-slot:[scopedSlotName]="slotData">
         <slot :name="scopedSlotName" v-bind="slotData"/>
       </template>
     </html-table>
     <table-footer ref="tfpg" @paged="p=>{page=p;}" :per-page="count" :total="total" :page="activePage"/>
    <div class="dt_overlay d-flex justify-content-center align-items-center text-center" v-if="loading">
      <span class="d-inline-block"><span><i class="bi-gear bi-spin" style="font-size: 2rem;"></i></span>
        <br/><span class="small ms-2">Wait...</span></span>
    </div>
  </div>
</template>

<script>
import TableTop    from "./src/TableTop";
import HtmlTable   from "./src/HtmlTable";
import TableFooter from "./src/TableFooter";
import _           from './../../helpers';

import './src/helpers/inliner.css';

export default {
  name: "DataTable",
  components: {TableFooter, HtmlTable, TableTop},
  props: {
    data: {type: Array, default: null,},
    urlConfig: Object,
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
    searchVar: {type: String, default: '_q'},
    pageVar: {type: String, default: 'page'},
    sizeVar: {type: String, default: 'per_page'},
    url: String,
    nonceUrl: String,
    noSearch: Boolean,
    noPageSize: Boolean,
  },
  data() {
    return {page: 1, count: 0, total: 0, activePage: 1, loading: false}
  },
  methods: {
    rowClass(cls, id) {
      this.$mitt.emit('rowClassed', {class: cls, id: id});
    },
    reload() {
      this.$mitt.emit('reload');
    },
    refresh() {
      this.$mitt.emit('refresh');
    }
  },
  computed: {
    cellSlotNames() {
      return this.columns.filter(c => _.isVarName(c.slot)).map(c => c.slot);
    },
    cellSlots() {
      return Object.fromEntries(Object.entries(this.$slots).filter(([k, v]) => this.cellSlotNames.includes(k)));
    },
    sUrl() {
      return this.url && this.url.toString().trim().length > 0 ? this.url.toString().trim() : (this.nonceUrl && this.nonceUrl.toString().trim().length ? this.nonceUrl.toString().trim() : null);
    },
    isNonce() {
      return (!this.url || this.url.toString().trim().length <= 0) && this.nonceUrl && this.nonceUrl.toString().trim().length > 0
    },
    isServerBased() {
      return (this.url && this.url.toString().trim().length > 0) || (this.nonceUrl && this.nonceUrl.toString().trim().length > 0)
    },
    sData() {
      return Array.isArray(this.data) && this.data.length ? this.data : null
    }
  },
  mounted() {
    //console.log(this.$scopedSlots,this.$slots,Object.keys(this.$slots))
    this.$mitt.on('page-confirmed', p => { this.activePage = p; });
    this.$mitt.on('onRowClick', obj => { this.$emit('onRowClick', obj.d, obj.i); });
  }
};
</script>

<style scoped>
.dt_wrapper {
  position: relative;
}

.dt_overlay {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #ffffffd9;
}
</style>
