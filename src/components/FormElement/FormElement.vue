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

import axios from 'axios';
import _     from './../../helpers';

export default {
  name: "FormElement",
  components: {},
  props: {
    retainModal: Boolean,
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
    preSubmission: {
      type: Function, default() {
        return true;
      }
    },
    preRun: {
      type: Function, default() {
        return true;
      }
    },
    postRun: {
      type: Function, default() {
        return true;
      }
    },
    postSubmission: {
      type: [Function, String], default(resp) {
      }
    }
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
      if (this.preventEnter || true !== this.preSubmission()) return;
      if (_.isFunction(this.preRun)) this.preRun();
      this.loading = true;
      // if (this.fields.id) this.fields['_method'] = 'PUT';
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
             if (typeof resp.data === 'string' || resp.data instanceof String) this.$alertify.success(resp.data);
             if (_.isFunction(this.postSubmission)) this.postSubmission(resp);
             if (_.isString(this.postSubmission)) {
               // this.$bus.emit(this.postSubmission);
             }
             this.loading = false;
           })
           .catch(error => {
             //  this.$alertify.error(this.logGetError(error))
             // if (error.response && error.response.data) this.$alertify.error(error.response.data);
             this.loading = false;
           })
           .then(r => {
             if (_.isFunction(this.postRun)) this.postRun();
           })
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
