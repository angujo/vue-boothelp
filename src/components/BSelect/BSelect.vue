<template>
  <VueMultiselect
      :modelValue="modelValue"
      @update:model-value="d=>{$emit('update:modelValue',d)}"
      :id="id"
      :options="ajaxList"
      :value="value"
      :multiple="multiple"
      :trackBy="trackBy"
      :label="label"
      :searchable="canSearch"
      :clearOnSelect="clearOnSelect"
      :hideSelected="hideSelected"
      :placeholder="placeholder"
      :allowEmpty="allowEmpty"
      :resetAfter="resetAfter"
      :closeOnSelect="closeOnSelect"
      :customLabel="cLabel"
      :taggable="theTag"
      :tagPlaceholder="tagPlaceholder"
      :tagPosition="tagPosition"
      :max="max"
      :optionsLimit="optionsLimit"
      :groupValues="groupValues"
      :groupLabel="groupLabel"
      :groupSelect="groupSelect"
      :blockKeys="blockKeys"
      :internalSearch="internalSearch"
      :preserveSearch="preserveSearch"
      :preselectFirst="preselectFirst"
      :name="name"
      :selectLabel="selectLabel"
      :selectGroupLabel="selectGroupLabel"
      :selectedLabel="selectedLabel"
      :deselectLabel="deselectLabel"
      :deselectGroupLabel="deselectGroupLabel"
      :showLabels="showLabels"
      :limit="limit"
      :limitText="limitText"
      :loading="ajaxLoading"
      :disabled="disabled"
      :maxHeight="maxHeight"
      :openDirection="openDirection"
      :showNoResults="showNoResults"
      :tabindex="tabindex"
      :showPointer="showPointer"
      :optionHeight="optionHeight"
      @search-change="getOptions">
    <template #noResult="props">
      <slot name="noResult" v-bind="props"/>
    </template>
    <template #option="props">
      <slot name="option" v-bind="props"/>
    </template>
    <template #placeholder="props">
      <slot name="placeholder" v-bind="props"/>
    </template>
    <template #afterlist="props">
      <slot name="afterlist" v-bind="props"/>
    </template>
    <template #beforeList="props">
      <slot name="beforeList" v-bind="props"/>
    </template>
    <template #noOptions="props">
      <slot name="noOptions" v-bind="props"/>
    </template>
    <template #caret="props">
      <slot name="caret" v-bind="props"/>
    </template>
    <template #singleLabel="props">
      <slot name="singleLabel" v-bind="props"/>
    </template>
    <template #limit="props">
      <slot name="limit" v-bind="props"/>
    </template>
    <template #tag="props">
      <slot name="tag" v-bind="props"/>
    </template>
    <template #clear="props">
      <slot name="clear" v-bind="props"/>
    </template>
  </VueMultiselect>
</template>

<script>
import VueMultiselect    from 'vue-multiselect';
import _                 from './../../helpers';
import mh                from './../../mixin-helper';
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "BSelect",
  components: {VueMultiselect},
  mixins: [NotificationMixin],
  emits: ['change', 'close', 'deselect', 'open', 'search-change', 'select', 'tag', 'clear', 'update:modelValue'],
  props: {
    id: {type: [Number, String], default: null},
    options: {type: Array, default: Array},
    value: [Object, Array, String, Number],
    multiple: {type: Boolean, default: false},
    trackBy: {type: String, default: null},
    label: {type: String, default: null},
    searchable: {type: Boolean, default: true},
    clearOnSelect: {type: Boolean, default: false},
    hideSelected: {type: Boolean, default: true},
    placeholder: {type: String, default: 'Select option'},
    allowEmpty: {type: Boolean, default: true},
    resetAfter: {type: Boolean, default: false},
    closeOnSelect: {type: Boolean, default: true},
    tagPlaceholder: {type: String, default: 'Press enter to create a tag'},
    tagPosition: {type: String, default: 'top'},
    max: {type: Number, default: Number},
    optionsLimit: {type: Number, default: 1000},
    groupValues: {type: String, default: null},
    groupLabel: {type: String, default: null},
    groupSelect: {type: Boolean, default: false},
    blockKeys: {type: Array, default: []},
    internalSearch: {type: Boolean, default: true},
    preserveSearch: {type: Boolean, default: false},
    preselectFirst: {type: Boolean, default: false},
    name: {type: String, default: ''},
    selectLabel: {type: String, default: 'Press enter to select'},
    selectGroupLabel: {type: String, default: 'Press enter to select group'},
    selectedLabel: {type: String, default: 'Selected'},
    deselectLabel: {type: String, default: 'Press enter to remove'},
    deselectGroupLabel: {type: String, default: 'Press enter to deselect group'},
    showLabels: {type: Boolean, default: true},
    limit: {type: Number, default: 99999},
    limitText: {type: Function},
    disabled: {type: Boolean, default: false},
    maxHeight: {type: Number, default: 300},
    openDirection: {type: String, default: ''},
    showNoResults: {type: Boolean, default: true},
    tabindex: {type: Number, default: 0},
    showPointer: {type: Boolean, default: true},
    optionHeight: {type: Number, default: 40},
    modelValue: null,
    url: String,
    noNotification: Boolean,
    preLoad: Boolean,
    tags: Boolean,
    params: {type: Object, default() {return {}}},
    minChars: {type: Number, default: 2},
  },
  data() {
    return {
      ajaxLoading: false,
      ajaxList: this.options
    }
  },
  methods: {
    ...mh,
    cLabel(opt) {
      if (this.label && _.has(opt, this.label)) return _.objectGet(opt, this.label);
      return opt;
    },
    syncOption(option) {
      if (!_.isPlainObject(option)) return option;
      let opt = {label: null, value: null};
      if (this.$attrs['label']) opt.label = _.objectGet(option, this.$attrs['label']);
      if (this.$attrs['track-by']) opt.value = _.objectGet(option, this.$attrs['track-by']);
      return opt;
    },
    bounce: _.debounce((v, q) => {
      v.ajaxLoading = true;
      q = q || '';
      let p = {q};
      if (_.isPlainObject(v.params)) p = Object.assign({}, v.params, p);
      v.$http.get(v.url, {params: p})
       .then(resp => {
         if (Array.isArray(resp.data)) v.ajaxList = resp.data;
       })
       .catch(err => {
         let er = v.logGetError(err);
         if (!v.noNotification) v.notifyError(er);
       })
       .then(r => {v.ajaxLoading = false;});
    }, 1500),
    getOptions(q) {
      if (!_.isString(q) || q.toString().trim().length <= 0) return;
      this.bounce(this, q);
    },
  },
  computed: {
    theTag() {return this.tags},
    theOptions() {
      return _.isUrl(this.url) ? this.ajaxList : this.options;
    },
    syncBased() {return _.isUrl(this.url)},
    canSearch() { return this.searchable || (_.isUrl(this.url) && !this.preLoad); },
    resolveOnLoad() {return _.isUrl(this.url) && this.preLoad === true;},
    theMode() {return this.tags ? 'tags' : (this.multiple ? 'multiple' : 'single');},
  },
  mounted() {
    if (this.preLoad) this.getOptions();
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
}
</style>
