<template>
  <data-load :url="url" v-if="fetcher" :class="accClass" :id="id" @loaded="loaded">
    <template v-for="(tmpl,i) in items" :key="i+id">
      <slot :data="tmpl"/>
    </template>
  </data-load>
  <div v-else :class="accClass" :id="id">
    <slot></slot>
  </div>
</template>

<script>
import _        from './../../helpers';
import DataLoad from "@/components/DataLoad/DataLoad";

export default {
  name: "Accordion",
  components: {DataLoad},
  props: {flush: Boolean, open: {type: Boolean, default: false}, url: String},
  data() {
    return {items: []}
  },
  methods: {
    loaded(dt) {
      this.items = Array.isArray(dt) || _.isPlainObject(dt) ? dt : [];
    }
  },
  computed: {
    accClass() {
      return ['accordion', this.flush ? 'accordion-flush' : ''];
    },
    id() {
      return _.mathRand('acp')
    },
    fetcher() {
      return _.isString(this.url);
    }
  }
};
</script>

<style scoped></style>
