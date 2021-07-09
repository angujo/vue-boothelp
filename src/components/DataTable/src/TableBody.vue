<template>
  <tbody>
  <body-row v-for="(d,i) in cData" :key="'i'+i+key" :data="d" :columns="columns"></body-row>
  </tbody>
</template>

<script>
import ColumnOptions from "./helpers/ColumnOptions";
import BodyRow       from "./BodyRow";

const axios = require('axios');

export default {
  name: "TableBody",
  components: {BodyRow},
  props: {nonce: Boolean, url: String, data: Array, isNonce: Boolean},
  data() {
    return {cData: []}
  },
  methods: {
    getData() {
      if (this.$parent.$parent.data && Array.isArray(this.$parent.$parent.data)) this.manualData();
      else this.serverData();
    },
    manualData() {
    },
    serverData() {
      if (null === this.url) {
        console.error('Invalid URL');
        return;
      }
      axios.get(this.url)
           .then(resp => {
             this.cData = Array.isArray(resp.data) ? resp.data : resp.data.data;
           })
           .catch(err => {
           })
           .then(r => {
           });
    }
  },
  computed: {
    key() {
      return "tbr" + Math.floor(Math.random() * 100000);
    },
    columns() {
      return this.$parent.$parent.columns.map((c) => {
        let col =
            (
                ({key, component, func, props, empty, events}) =>
                    ({key, component, func, props, empty, events})
            )(c);
        if (!col.key) {
          col.key = "tb" + Math.floor(Math.random() * 100000);
          col.autoKey = true;
        }
        if (!col.empty) col.empty = ColumnOptions.empty;
        return Object.fromEntries(Object.entries(col).filter(([k, v]) => (typeof v !== 'undefined')));
      });
    },
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped></style>
