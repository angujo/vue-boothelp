<template>
  <tbody name="row-table" is="transition-group">
  <template v-if="pagedData.length>0">
    <body-row v-for="(d,i) in pagedData" :data="d" :columns="columns" :key="key+indexKey(i)+fKey" :index="i" :page="page" :count="count">
      <template v-for="(_, scopedSlotName) in $slots" v-slot:[scopedSlotName]="slotData">
        <slot :name="scopedSlotName" v-bind="slotData"/>
      </template>
    </body-row>
  </template>
  <tr v-else>
    <td :colspan="columns.length">
      <div class="bg-light p-5 text-center">
        <div>No Data</div>
      </div>
    </td>
  </tr>
  </tbody>
</template>

<script>
import BodyRow from "./BodyRow";
import _       from './../../../helpers';


export default {
  name: "TableBody",
  components: {BodyRow},
  props: {nonce: Boolean, data: Array, count: Number, page: Number},
  data() {
    return {cData: [], checks: {}, nonced: false, searches: {}, sorts: {}, fKey: null}
  },
  methods: {
    indexKey(i) {
      return _.md5(_.mathRand('br' + i + '-'));
    },
    getData() {
      if (this.forPureData) this.manualData();
      else this.serverData();
    },
    manualData() {
      if (0 >= this.cData.length) this.cData = this.$parent.$parent.data;
      if (!this.cData || !Array.isArray(this.cData)) this.cData = [];
    },
    serverData() {
      if (null === this.url) {
        console.error('Invalid URL');
        return;
      }
      this.$parent.$parent.loading = true;
      this.$http.get(this.url, this.getParams)
           .then(resp => {
             this.cData = Array.isArray(resp.data) ? resp.data : resp.data.data;
             this.nonced = this.isNonce;
             this.$emit('onTotal', Array.isArray(resp.data) || !this.cData.total ? this.cData.length : this.cData.total);
           })
           .catch(err => {
           })
           .then(r => {
             this.$parent.$parent.loading = false;
           });
    },
    queryCheck(rd, k, q) {
      if (k === this.searchVar) {
        if (_.isPlainObject(rd)) {
          rd = Object.values(rd)
        }
        if (Array.isArray(rd)) {
          for (var i = 0; i < rd.length; i++) {
            if (true === this.queryCheck(rd[i], k, q)) return true;
          }
        }
        let v = rd ? rd.toString() : '';
        return !!(v && v.toString().toLowerCase().includes(q.toString().toLowerCase()));
      }
      let v = null;
      v = _.isPlainObject(rd) ?
          _.objectGet(rd, k) :
          ((Array.isArray(rd) && _.isInt(k) && _.hasIndex(rd, parseInt(k))) ? rd[parseInt(k)] : null);
      if (_.isPlainObject(v)) v = JSON.stringify(v);
      return !!(v && v.toString().toLowerCase().includes(q.toString().toLowerCase()));
    },
    rowMatches(rd, s) {
      let c = false, v = null;
      for (var i = 0; i < s.length; i++) {
        let sg = s[i];
        if (!_.isString(sg[1])) continue;
        if (this.queryCheck(rd, sg[0], sg[1])) return true;
      }
      return c;
    },
    sortableValue(obj, k) {
      let a = obj;
      if (_.isPlainObject(obj)) {
        a = _.objectGet(obj, k);
      }
      else if (Array.isArray(obj) && _.isInt(k) && _.hasIndex(obj, parseInt(k))) {
        a = obj[parseInt(k)];
      }
      return _.isPlainObject(a) ? JSON.stringify(a) : a.toString();
    }
  },
  computed: {
    getParams() {
      let conf = _.isPlainObject(this.urlConfig) ? this.urlConfig : {};
      conf = _.cleanObjectUnset((({headers, params, timeout, auth}) => ({headers, params, timeout, auth}))(conf), 'undefined');
      if (!_.isEmptyObject(this.searches) || !_.isEmptyObject(this.sorts)) {
        if (!conf.params) conf.params = {};
        if (_.isNotEmptyObject(this.searches)) conf.params.search = this.searches;
        if (_.isNotEmptyObject(this.sorts)) conf.params.sort = this.sorts;
      }
      return conf;
    },
    optimizedData() {
      if (!this.forPureData) return this.cData;
      let dt = this.cData;
      if (_.isNotEmptyObject(this.searches)) {
        this.fKey = _.md5(JSON.stringify(this.searches).toString());
        let se = Object.entries(this.searches);
        dt = dt.filter(d => {
          return this.rowMatches(d, se);
        });
      }
      if (_.isNotEmptyObject(this.sorts)) {
        let so = Object.entries(this.sorts), s = null;
        for (var i = 0; i < so.length; i++) {
          s = so[i];
          dt.sort((a, b) => {
            a = this.sortableValue(a, s[0]);
            b = this.sortableValue(b, s[0]);
            if (!isNaN(a) && !isNaN(b)) {
              a = parseFloat(a);
              b = parseFloat(b);
            }
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          });
          if (2 === parseInt(s[1])) dt.reverse();
        }
      }
      this.$emit('onTotal', dt.length);
      return dt;
    },
    pagedData() {
      let dt = this.optimizedData;
      if (this.forPureData) {
        let offs = ((this.page - 1) * this.count);
        dt = dt.slice(offs, offs + this.count);
      }
      this.$mitt.emit('page-confirmed', this.page);
      return dt;
    },
    forPureData() {
      return !this.isServerBased || (this.isNonce && this.nonced);
    },
    isNonce() {
      return this.$parent.$parent.isNonce;
    },
    urlConfig() {
      return this.$parent.$parent.urlConfig;
    },
    url() {
      return this.$parent.$parent.sUrl;
    },
    searchVar() {
      return this.$parent.$parent.searchVar;
    },
    isServerBased() {
      return this.$parent.$parent.isServerBased;
    },
    key() {
      return "tbr" + Math.floor(Math.random() * 100000) + '-' + this.page + '-' + this.count;
    },
    columns() {
      return this.$parent.columns.body;
    },
  },
  watch: {
    count(v) {
      if (this.isServerBased) this.getData();
    }
  },
  mounted() {
    this.getData();
    this.$mitt.on('reload', () => {
      this.getData();
    });
    this.$mitt.on('sort', s => {
      this.sorts = s;
    });
    this.$mitt.on('search', s => {
      this.searches = s;
    });
  }
};
</script>
<style scoped>
.row-table-move {
  transition: transform 1s;
}
</style>
