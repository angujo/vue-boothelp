<template>
  <td>
    <span v-if="isComponent" :is="column.component" :cell-data="cellData" v-bind="compProps"/>
    <span v-else-if="isFunc" v-html="funcValue"/>
    <span v-else-if="isKeyBased" v-html="keyValue"/>
    <span v-else v-html="cellData"/>
  </td>
</template>

<script>
import _ from './../../../helpers';

export default {
  name: "ColumnCell",
  props: {cellData: null, column: Object},
  methods: {
    getProps(props) {
      if (!props) return {};
      if (_.isFunction(props)) return this.getProps(props(this.cellData));
      if (_.isPlainObject(props)) return props;
      return {};
    }
  },
  computed: {
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
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>