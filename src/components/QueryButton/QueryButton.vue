<template>
  <load-button type="button" :busy="busy" @click="submitForm">
    <template #default>
      <slot>#queryButton</slot>
    </template>
  </load-button>
</template>

<script>
import LoadButton        from "./../LoadButton/LoadButton";
import _                 from "./../../helpers";
import lmix              from './../../mixin-helper';
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "QueryButton",
  components: {LoadButton},
  mixins: [NotificationMixin],
  emits: ['success', 'error'],
  props: {
    url: {type: String, required: true},
    params: {type: Object, default() {return {}}},
    type: {type: String, default: 'button'},
    noBusyText: Boolean,
    beforeSave: Function,
    method: String,
    multipart: Boolean,
    noNotification: Boolean,
  },
  data() {return {busy: false, fields: this.params}},
  methods: {
    ...lmix,
    submitForm() {
      if (_.isFunction(this.beforeSave) && false === this.beforeSave()) return;
      this.busy = true;
      if (this.method && ['put', 'patch', 'delete'].includes(this.method.toString().toLowerCase())) {
        this.fields['_method'] = this.method.toString().toUpperCase();
      }
      let headers = {},
          fields = this.fields,
          formData = {};
      if (this.multiPart) {
        headers = Object.assign({}, headers, {'Content-Type': 'multipart/form-data'});
        formData = new FormData();
        for (const [k, v] of Object.entries(fields)) {
          this.fDataValue(formData, k, v);
        }
      }
      else formData = fields;
      this.$http.post(this.url, formData, {headers})
          .then(resp => {
            if (!this.noNotification) this.notifySuccess(_.isString(resp.data) && 0 < resp.data.length ? resp.data : 'Successfully Submitted');
            this.$emit('success', resp.data);
          })
          .catch(error => {
            if (!this.noNotification) this.notifyError(this.logGetError(error));
            this.$emit('error', error);
          })
          .then(r => {
            this.$emit('complete', ...arguments);
            this.busy = false;
          })
    },
  },
  watch: {
    params: {
      deep: true,
      handler(v) {
        this.fields = v;
      }
    }
  }
};
</script>

<style scoped>
</style>
