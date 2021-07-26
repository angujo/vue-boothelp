<template>
  <progress-overlay :loading="fetching">
    <form method="post" :action="url" @submit.prevent="submitForm">
      <div class="mb-3 text-danger" v-if="requireList.length>0">
        Error encountered. The following fields are required;
        <ul>
          <li v-for="req in requireList">{{ req }}</li>
        </ul>
      </div>
      <slot>#FormBody</slot>
      <template v-if="false===pureForm">
        <hr v-if="!inline"/>
        <div :class="[inline?'d-inline-flex':'d-flex','justify-content-between align-items-center']">
          <div v-if="!inline">
            <slot name="buttonsline"></slot>
          </div>
          <div class="btn-group">
            <slot name="prebuttons"></slot>
            <button type="submit" :class="btnClass" :disabled="loading" v-if="showButton" :inactive="inactiveButton">
              <span v-if="loading"><i class="bi-gear bi-spin"/> Wait...</span>
              <span v-else v-html="btnText"></span>
            </button>
            <slot name="buttons"></slot>
          </div>
        </div>
      </template>
    </form>
  </progress-overlay>
</template>

<script>

import axios             from 'axios';
import _                 from './../../helpers';
import lmix              from './../../mixin-helper';
import NotificationMixin from "./../Notification/NotificationMixin";
import ProgressOverlay   from "./../ProgressOverlay/ProgressOverlay";

export default {
  name: "FormElement",
  components: {ProgressOverlay},
  mixins: [NotificationMixin],
  props: {
    required: {type: [Array, Object, String], default: null},
    loadUrl: {type: String, default: null},
    method: String,
    noNotification: Boolean,
    inline: Boolean,
    preventEnter: Boolean,
    pureForm: {type: Boolean, default: false},
    inactiveButton: {type: Boolean, default: false},
    multiPart: {type: Boolean, default: false},
    showButton: {type: Boolean, default: true},
    fields: {type: Object, required: true},
    url: {type: String, required: true},
    btnClass: {type: String, default: `btn btn-primary`},
    btnText: {type: String, default: `<i class="bi-save"></i> Submit`},
    beforeSave: {
      type: Function, default() {
        return true;
      }
    },
  },
  data() {
    return {loading: false, params: {}, fetching: false, requireList: []}
  },
  methods: {
    ...lmix,
    checkRequired() {
      if (!this.required || this.required.length === 0) return true;
      let reqs = [];
      this.requireList = [];
      if (_.isString(this.required)) {
        reqs = this.required.split(',').map(r => [r, r]);
      }
      else if (_.isPlainObject(this.required)) reqs = Object.entries(this.required);
      else if (Array.isArray(this.required)) reqs = this.required;
      if (!Array.isArray(reqs)) return true;
      reqs = reqs.map(r => {
        if (Array.isArray(r)) {
          if (r.length <= 0) return null;
          if (r.length === 2) return r;
          if (r.length > 2) return [(r[0] || '[NONE]').toString, (r[1] || '[NONE]').toString];
          if (r.length === 1) return [(r[0] || '[NONE]').toString, (r[0] || '[NONE]').toString];
        }
        if (_.isString(r)) return [r, r];
        if (_.isPlainObject(r)) {
          r = Object.entries(r);
          return r.length > 0 ? r[0] : null;
        }
        return null;
      }).filter(r => r);
      for (let i = 0; i < reqs.length; i++) {
        let k = reqs[i][0], v = reqs[i][1],
            m = _.objectGet(this.fields, k, null);
        if (null === m || typeof m === 'undefined') {this.requireList.push(v);}
      }
      return this.requireList.length === 0;
    },
    loadData() {
      this.fetching = true;
      axios.get(this.loadUrl)
           .then(resp => {
             this.$emit('loaded', resp.data);
           })
           .catch(error => {
             if (!this.noNotification) this.notifyError(this.logGetError(error));
             this.$emit('loadError', error);
           })
           .then(r => {
             this.$emit('loadComplete', ...arguments);
             this.fetching = false;
           })
    },
    fDataValue(formData, key, val) {
      if (Array.isArray(val)) {
        for (let f = 0; f < val.length; f++) {
          this.fDataValue(formData, `${key}[${f}]`, val[f])
        }
      }
      else formData.append(key, val);
    },
    submitForm() {
      if (this.preventEnter || !this.checkRequired() || (_.isFunction(this.beforeSave) && false === this.beforeSave())) return;
      this.loading = true;
      if (this.method && ['put', 'patch', 'delete'].includes(this.method.toString().toLowerCase())) {
        this.fields['_method'] = this.method.toString().toUpperCase();
      }
      let headers = {}, formData = this.fields;
      if (this.multiPart) {
        headers = Object.assign({}, headers, {'Content-Type': 'multipart/form-data'});
        formData = new FormData();
        for (const [k, v] of Object.entries(this.fields)) {
          this.fDataValue(formData, k, v);
        }
      }
      axios.post(this.url, formData, {headers})
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
             this.loading = false;
           })
    }
  },
  mounted() {
    if (this.loadUrl && _.isString(this.loadUrl)) this.loadData();
  }
}
</script>

<style scoped>

</style>
