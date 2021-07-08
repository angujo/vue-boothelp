<template>
  <div class="d-flex align-items-start justify-content-between">
    <div class="col p-0 text-start">
      <slot><span v-html="column.title"/></slot>
    </div>
    <div class="col-auto p-0 d-flex small" v-if="!noRights">
      <template v-if="column.searchable">
        <popper trigger="clickToOpen" :options="{placement:'top-start'}">
          <div class="bg-white p-1">
            <div class="input-group input-group-sm" style="max-width: 15rem;">
              <input type="text" class="form-control" placeholder="Search..." aria-label="Search..." v-model="search"
                     @keyup.enter="doSearch">
              <button class="btn btn-outline-secondary p-1" type="button" @click="doSearch"><i class="bi-search"></i></button>
            </div>
          </div>
          <a slot="reference" :class="['p-0',searched?'text-primary':'text-muted']" href="Javascript:void(0);">
            <i class="bi-funnel-fill"/>
          </a>
        </popper>
      </template>
      <a class="p-0 text-muted ms-1" href="Javascript:void(0);" v-if="column.sortable" @click="switchAscend">
        <i class="bi-sort-up-alt" v-if="1===ascend"/>
        <i class="bi-sort-up" v-else-if="2===ascend"/>
        <i class="bi-arrow-down-up" v-else/>
      </a>
    </div>
  </div>
</template>

<script>
import Popper from "vue-popperjs";

import "vue-popperjs/dist/vue-popper.css";

export default {
  name: "ColumnHead",
  components: {Popper},
  props: {column: {type: Object, default: null}},
  data() {
    return {ascend: 0, search: null, searched: false};
  },
  methods: {
    switchAscend() {
      this.ascend++;
      if (2 < this.ascend) this.ascend = 0;
      this.$emit("sort", this.column.key, this.ascend);
    },
    doSearch() {
      if (this.column.key) {
        this.$emit("search", this.column.key, this.search);
      }
      this.searched = 0 < this.search.trim().length;
    }
  },
  computed: {
    noRights() {
      return !this.column.searchable && !this.column.sortable;
    }
  }
};
</script>

<style scoped></style>
