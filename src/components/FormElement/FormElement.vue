<template>
  <form method="post" :action="url" @submit.prevent="submitForm">
    <slot>#FormBody</slot>
    <template v-if="false===pureForm">
      <hr v-if="!inline"/>
      <div :class="[inline?'d-inline-flex':'d-flex','justify-content-between align-items-center']">
        <div v-if="!inline">
          <slot name="buttonsline"></slot>
        </div>
        <div class="btn-group">
          <slot name="prebuttons"></slot>
          <button type="submit" :class="btnClass" :loading="loading" v-if="showButton" :inactive="inactiveButton">
            <span v-html="btnText"></span>
          </button>
          <slot name="buttons"></slot>
        </div>
      </div>
    </template>
  </form>
</template>

<script>

import axios             from 'axios';
import _                 from './../../helpers';
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "FormElement",
  components: {},
  mixins: [NotificationMixin],
  props: {
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
    return {loading: false, params: {}}
  },
  methods: {
    fDataValue(formData, key, val) {
      if (Array.isArray(val)) {
        for (let f = 0; f < val.length; f++) {
          this.fDataValue(formData, `${key}[${f}]`, val[f])
        }
      }
      else formData.append(key, val);
    },
    submitForm() {
      if (this.preventEnter || (_.isFunction(this.beforeSave) && false === this.beforeSave())) return;
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
             if (_.isString(resp) && !this.noNotification) this.notifySuccess(resp.data);
             this.loading = false;
             this.$emit('success', resp.data);
           })
           .catch(error => {
             if (!this.noNotification) this.notifyError(this.logGetError(error));
             this.loading = false;
             this.$emit('error', error);
           })
           .then(r => {
             this.$emit('complete', ...arguments);
           })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
