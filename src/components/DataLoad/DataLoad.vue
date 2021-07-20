<template>
  <div class="position-relative">
    <template v-if="listing">
      <template v-for="cnt in content">
        <slot :content="cnt"></slot>
      </template>
    </template>
    <slot v-else :content="content"></slot>
    <div v-if="loading" class="p-5 bg-light d-flex justify-content-center align-items-center">
      <span><i class="bi-gear bi-spin"></i> Loading...</span>
    </div>
    <div v-else-if="error" class="p-5 bg-failed text-center">
      <div>
        <button class="btn btn-link" type="button" @click="reload">Refresh</button>
      </div>
      <span v-html="logGetError(error)"/>
    </div>
  </div>
</template>

<script>
import axios  from "axios";
import _      from './../../helpers';
import MixinH from './../../mixin-helper';

export default {
  name: "DataLoad",
  emits: ['loaded', 'error'],
  props: {
    method: {type: String, default: 'get'},
    data: Object,
    headers: Object,
    params: Object,
    url: {type: String, required: true},
    listing: Boolean
  },
  data() {
    return {loading: false, content: null, error: null};
  },
  methods: {
    ...MixinH,
    reload() {
      this.getData();
    },
    async getData() {
      this.error = null;
      this.loading = true;
      let p = {}, _p = {},
          h = {'X-Requested-With': 'XMLHttpRequest'};
      if (_.isPlainObject(this.data)) p = Object.assign({}, p, this.data);
      if (_.isPlainObject(this.headers)) h = Object.assign({}, h, this.headers);
      if (_.isPlainObject(this.params)) _p = Object.assign({}, _p, this.params);
      axios({
        method: ['post', 'get'].includes(this.method) ? this.method : 'get',
        url: this.url,
        headers: h,
        params: _p,
        data: p
      })
          .then(resp => {
            this.content = this.listing ? (Array.isArray(resp.data) ? resp.data : []) : resp.data;
            this.$emit('loaded', this.content);
          })
          .catch(er => {
            this.error = er;
            this.$emit('error', this.logGetError(er));
          })
          .then(d => {
            this.loading = false;
          });
    }
  },
  computed: {},
  mounted() {
    if (_.isString(this.url) && this.url) this.getData();
  }
};
</script>

<style scoped>
.position-relative {
  position: relative;
}

.bg-failed {
  background-color: #ffe5e5 !important;
}
</style>
