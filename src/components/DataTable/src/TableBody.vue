<template>
  <tbody>
  <body-row v-for="(d,i) in data" :key="'i'+i+key" :data="d" :columns="columns"></body-row>
  </tbody>
</template>

<script>
import ColumnOptions from "./helpers/ColumnOptions";
import BodyRow       from "./BodyRow";

export default {
  name: "TableBody",
  components: {BodyRow},
  data() {
    return {isNonce: false, data: []}
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
             this.data = Array.isArray(resp.data) ? resp.data : resp.data.data;
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
    url() {
      return this.$parent.$parent.url.toString().trim().length <= 0 ? this.$parent.$parent.url.toString().trim() :
          (this.$parent.$parent.nonceUrl.toString().trim().length ? this.$parent.$parent.nonceUrl.toString().trim() : null);
    },
    columns() {
      return this.$parent.$parent.columns.map((c) => {
        let col =
            (
                ({key, component, func, props, empty}) =>
                    ({key, component, func, props, empty})
            )(Object.assign({}, ColumnOptions, c));
        if (!col.key) col.key = "tb" + Math.floor(Math.random() * 100000);
        return col;
      });
    },
  },
  mounted() {
    console.log(Object.keys(this.$parent.$parent))
   // this.isNonce = this.$parent.$parent._props.url.toString().trim().length <= 0 && this.$parent.$parent._props.nonceUrl.toString().trim().length;
    this.getData();
  }
};
</script>

<style scoped></style>
