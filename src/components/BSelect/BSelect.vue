<template>
  <multiselect :mode="theMode" :minChars="minChars" :filterResults="true" :resolveOnLoad="resolveOnLoad" :delay="2"
               :options="syncBased?async (q)=> {return await getOptions(q); }:theOptions" :searchable="canSearch">
    <template #placeholder="props">
      <slot name="placeholder" v-bind="props"/>
    </template>
    <template #afterlist="props">
      <slot name="afterlist" v-bind="props"/>
    </template>
    <template #beforelist="props">
      <slot name="beforelist" v-bind="props"/>
    </template>
    <template #multiplelabel="props">
      <slot name="multiplelabel" v-bind="props"/>
    </template>
    <template #nooptions="props">
      <slot name="nooptions" v-bind="props"/>
    </template>
    <template #noresults="props">
      <slot name="noresults" v-bind="props"/>
    </template>
    <template #option="props">
      <slot name="option" v-bind="props"/>
    </template>
    <template #singlelabel="props">
      <slot name="singlelabel" v-bind="props"/>
    </template>
    <template #tag="props">
      <slot name="tag" v-bind="props"/>
    </template>
    <template #caret="props">
      <slot name="caret" v-bind="props"/>
    </template>
    <template #clear="props">
      <slot name="clear" v-bind="props"/>
    </template>
    <template #spinner="props">
      <slot name="spinner" v-bind="props"/>
    </template>
  </multiselect>
</template>

<script>
import Multiselect       from '@vueform/multiselect';
import _                 from './../../helpers';
import mh                from './../../mixin-helper';
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "BSelect",
  components: {Multiselect},
  mixins: [NotificationMixin],
  emits: ['change', 'close', 'deselect', 'open', 'search-change', 'select', 'tag', 'clear'],
  props: {
    url: String,
    searchable: Boolean,
    noNotification: Boolean,
    preLoad: Boolean,
    multiple: Boolean,
    tags: Boolean,
    params: {type: Object, default() {return {}}},
    minChars: {type: Number, default: 2},
    options: {type: [Array, Object], default() {return []}},
  },
  methods: {
    ...mh,
    syncOption(option) {
      if (!_.isPlainObject(option)) return option;
      let opt = {label: null, value: null};
      if (this.$attrs['label']) opt.label = _.objectGet(option, this.$attrs['label']);
      if (this.$attrs['track-by']) opt.value = _.objectGet(option, this.$attrs['track-by']);
      return opt;
    },
    async getOptions(q) {
      let p = {q};
      if (_.isPlainObject(this.params)) p = Object.assign({}, this.params, p);
      let opts = [];
      await this.$http.get(this.url, {params: p})
                .then(resp => {
                  if (Array.isArray(resp.data)) opts = resp.data;
                })
                .catch(err => {
                  let er = this.logGetError(err);
                  if (!this.noNotification) this.notifyError(er);
                });
      return opts;
    },
  },
  computed: {
    theOptions() {
      return (_.isPlainObject(this.options) ? Object.entries(this.options).map(o => {return {label: o[1], id: o[0]}}) : this.options);
    },
    syncBased() {return _.isUrl(this.url)},
    canSearch() { return this.searchable || (_.isUrl(this.url) && !this.preLoad); },
    resolveOnLoad() {return _.isUrl(this.url) && this.preLoad === true;},
    theMode() {return this.tags ? 'tags' : (this.multiple ? 'multiple' : 'single');},
  }
};
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
}
</style>
