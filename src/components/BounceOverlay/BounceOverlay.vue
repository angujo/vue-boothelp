<template>
  <slot/>
  <div class="progress" v-if="submitting">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0"
         aria-valuemax="100" style="width: 100%"></div>
  </div>
</template>

<script>
import mh                from "./../../mixin-helper";
import _                 from "./../../helpers";
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "BounceOverlay",
  emits: ['success', 'error', 'bounced'],
  mixins: [NotificationMixin],
  props: {
    monitor: {type: null},
    url: String,
    paramName: {type: String, default: 'data'},
    reduce: [String, Function],
    noNotification: Boolean,
    params: Object,
  },
  data() {return {submitting: false, ftime: true}},
  methods: {
    ...mh,
    bounce: _.debounce((v) => {
      if (!_.isString(v.url)) {
        v.$emit('bounced');
        return;
      }
      v.submitting = true;
      let dt = _.isPlainObject(v.params) ? v.params : {};
      dt[v.paramName] = v.subData;
      v.$http.post(v.url, dt)
       .then(resp => {
         v.$emit('success', resp.data);
         if (!v.noNotification && _.isString(resp.data)) v.notifySuccess(resp.data);
       })
       .catch(err => {
         v.logGetError(err);
         if (!v.noNotification) v.notifyError(v.logError(err));
         v.$emit('error', err);
       })
       .then(r => {
         v.submitting = false;
         v.$emit('bounced');
       })
    }, 1500),
    saveChange() {
      this.bounce(this);
    }
  },
  computed: {
    subData() {
      return Array.isArray(this.monitor) ? this.monitor.map(l => {
        if (_.isString(this.reduce)) return _.objectGet(l, this.reduce, l);
        if (_.isFunction(this.reduce)) return this.reduce(l);
        return l;
      }) : this.monitor;
    },
  },
  watch: {
    monitor() {
      if (!this.ftime) this.saveChange();
      this.ftime = false;
    }
  }
};
</script>

<style scoped>
</style>
