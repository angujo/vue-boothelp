<template>
  <td :class="column.dataClass">
    <template v-if="isSpecial">
      <sp-checkbox ref="spcheck" v-if="isSpCheckbox" @checked="checked" :init-value="chInitV"/>
      <span v-else-if="isSpNumber" v-html="index || column.empty"/>
      <span v-else-if="isSpDataNumber" v-html="dataIndex || column.empty"/>
      <span v-else v-html="column.empty"></span>
    </template>
    <template v-else-if="isSlotBased">
      <slot :name="column.slot" :cell-data="cellData"/>
    </template>
    <span v-else-if="isComponent" :is="column.component" :cell-data="cellData" v-bind="compProps"/>
    <span v-else-if="isFunc" v-html="formatter(funcValue)"/>
    <span v-else-if="isKeyBased" v-html="formatter(keyValue)"/>
    <span v-else v-html="formatter(cellData)"/>
  </td>
</template>

<script>
import _ from './../../../helpers';
import v from './../../../Vars';

export default {
  name: "ColumnCell",
  components: {'sp-checkbox': () => import('./helpers/SpCheckbox')},
  props: {cellData: null, column: Object, index: Number, dataIndex: Number, rowId: String},
  data() {
    return {chInitV: false}
  },
  methods: {
    formatter(r) {
      return _.isFunction(this.column.formatter) ? this.column.formatter(r) : r;
    },
    getProps(props) {
      if (!props) return {};
      if (_.isFunction(props)) return this.getProps(props(this.cellData));
      if (_.isPlainObject(props)) return props;
      return {};
    },
    checked(v) {
      return _.isFunction(this.column.checked) ? this.column.checked(this.cellData, v, this.rowId) : false;
    }
  },
  computed: {
    isSpecial() {
      return _.isString(this.column.special) && [v.spCheckbox, v.spRowNumber, v.spDataRowNumber].includes(this.column.special);
    },
    isSpCheckbox() {
      return this.isSpecial && this.column.special === v.spCheckbox;
    },
    isSpNumber() {
      return this.column.special === v.spRowNumber;
    },
    isSpDataNumber() {
      return this.column.special === v.spDataRowNumber;
    },
    isSlotBased() {
      return this.column.slot && _.isVarName(this.column.slot);
    },
    isKeyBased() {
      return _.isPlainObject(this.cellData) && !this.column.autoKey;
    },
    keyValue() {
      return this.isKeyBased ? _.objectGet(this.cellData, this.column.key, this.column.empty) : this.column.empty;
    },
    isFunc() {
      return _.isFunction(this.column.func);
    },
    funcValue() {
      return this.isFunc ? this.column.func(this.cellData) : this.column.empty;
    },
    isComponent() {
      return _.isVueComponent(this.column.component);
    },
    compProps() {
      return this.getProps(this.column.props);
    },
  },
  watch: {},
  mounted() {
    if (this.isSpCheckbox) {
      this.chInitV = this.checked(null);
      this.$mitt.on('column-check-' + this.column.key, v => {
        if (this.$refs.spcheck) this.$refs.spcheck.setCheck(v);
      })
    }
  }
}
</script>

<style scoped>

</style>