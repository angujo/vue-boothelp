<template>
  <draggable v-model="list"
             :tag="tag"
             :component-data="componentData"
             @start="$emit('start')"
             @add="$emit('add')"
             @remove="$emit('remove')"
             @update="$emit('update')"
             @end="saveDrag"
             @choose="$emit('choose')"
             @unchoose="$emit('unchoose')"
             @sort="$emit('sort')"
             @filter="$emit('filter')"
             @clone="$emit('clone')">
    <template #item="{element}">
      <slot name="item" :element="element"/>
    </template>
    <template #footer>
      <slot name="footer"/>
    </template>
    <template #header>
      <slot name="header"/>
    </template>
  </draggable>
  <div class="progress" v-if="submitting">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0"
         aria-valuemax="100" style="width: 100%"></div>
  </div>
</template>

<script>
import draggable         from 'vuedraggable';
import _                 from './../../helpers';
import mh                from './../../mixin-helper';
import axios             from "axios";
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "Dragger",
  emits: ['start', 'add', 'remove', 'update', 'end', 'choose', 'unchoose', 'sort', 'filter', 'clone',
    'success', 'error', 'update:modelValue'],
  mixins: [NotificationMixin],
  components: {draggable},
  props: {
    modelValue: Array,
    url: String,
    delay: {type: Number, default: 1000},
    reduce: [String, Function], noNotification: Boolean,
    componentData: Object, tag: String,
  },
  data() {return {list: this.modelValue, submitting: false}},
  methods: {
    ...mh,
    bounce: _.debounce((v) => {
      v.submitting = true;
      axios.post(v.url)
           .then(resp => {
             v.$emit('success', resp.data);
             if (!v.noNotification && _.isString(resp.data)) v.notifySuccess(resp.data);
           })
           .catch(err => {
             v.logGetError(err);
             v.$emit('error', err);
           })
           .then(r => {v.submitting = false;})
    }, this.delay),
    saveDrag() {
      this.$emit('end');
      if (_.isString(this.url)) this.bounce(this);
    }
  },
  computed: {
    subList() {
      return this.list.map(l => {
        if (_.isString(this.reduce)) return _.objectGet(l, this.reduce, l);
        if (_.isFunction(this.reduce)) return this.reduce(l);
        return l;
      })
    }
  },
  watch: {
    list: {
      deep: true, handler(v) {this.$emit('update:modelValue', v);}
    }
  }
};
</script>

<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
