<template>
  <table class="table table-bordered">
    <table-head @checked="allChecked"></table-head>
    <table-body :data="data" :page="page" :count="count" @onTotal="t=>{$emit('onTotal',t);}">
      <template v-for="(_, scopedSlotName) in $scopedSlots" v-slot:[scopedSlotName]="slotData">
        <slot :name="scopedSlotName" v-bind="slotData"/>
      </template>
    </table-body>
    <table-foot></table-foot>
  </table>
</template>

<script>
import TableHead     from "./TableHead";
import TableBody     from "./TableBody";
import TableFoot     from "./TableFoot";
import v             from './../../../Vars';
import _             from './../../../helpers';
import ColumnOptions from "./helpers/ColumnOptions";

export default {
  name: "HtmlTable",
  components: {TableFoot, TableBody, TableHead},
  props: {data: Array, page: Number, count: Number},
  data() {
    return {headChecks: {}, rowsChecked: []}
  },
  methods: {
    allChecked(k, v) {
      this.$mitt.emit('column-check-' + k, v);
    }
  },
  computed: {
    columns() {
      let cl = {head: [], body: []};
      this.$parent.columns.forEach(clm => {
        if (!clm.key || !_.isString(clm.key)) {
          clm.key = "clm" + Math.floor(Math.random() * 100000);
          clm.autoKey = true;
        }
        if (clm.special && _.isString(clm.special) && v.spCheckbox === clm.special) this.headChecks[clm.key] = false;
        let cbdy =
            (
                ({key, component, func, props, empty, events, slot, special, checked, dataClass, formatter, varName}) =>
                    ({key, component, func, props, empty, events, slot, special, checked, dataClass, formatter, varName})
            )(clm);
        if (!cbdy.empty) cbdy.empty = ColumnOptions.empty;
        if (!_.isEmptyObject(cbdy)) cl.body.push(_.cleanObjectUnset(cbdy, 'undefined'));

        let chd =
            (
                ({title, key, background, color, searchable, sortable, special, headClass, varName}) =>
                    ({title, key, background, color, searchable, sortable, special, headClass, varName})
            )(clm);
        if (!_.isEmptyObject(chd)) cl.head.push(_.cleanObjectUnset(chd, 'undefined'));

      });
      return cl;
    }
  }
};
</script>

<style scoped></style>
