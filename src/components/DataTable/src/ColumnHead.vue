<template>
  <div v-if="isSpecial">
    <span v-if="isSpNumber" v-html="column.title || '#'"/>
    <sp-checkbox v-else-if="isSpCheckbox" @checked="(v)=>{$emit('checked',column.key,v);}">
      <span class="ms-2" v-html="column.title"/>
    </sp-checkbox>
    <span v-html="column.title" v-else/>
  </div>
  <div class="d-flex align-items-start justify-content-between" v-else>
    <div class="col p-0">
      <slot><span v-html="column.title"/></slot>
    </div>
    <div class="col-auto p-0 d-flex small" v-if="!noRights">
      <template v-if="searchable">
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
      <a class="p-0 text-muted ms-1" href="Javascript:void(0);" v-if="sortable" @click="switchAscend">
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
import _      from "./../../../helpers";
import v      from "./../../../Vars";

export default {
  name: "ColumnHead",
  components: {'sp-checkbox': () => import('./helpers/SpCheckbox'), Popper},
  props: {column: {type: Object, default: null}},
  data() {
    return {ascend: 0, search: null, searched: false};
  },
  methods: {
    allChecked(v) {
      console.log(this.$parent.$parent.$options.name, v)
    },
    switchAscend() {
      this.ascend++;
      if (2 < this.ascend) this.ascend = 0;
      this.$emit("sort", this.column.varName, this.ascend);
    },
    doSearch() {
      if (this.column.varName) {
        this.$emit("search", this.column.varName, this.search);
      }
      this.searched = 0 < this.search.trim().length;
    }
  },
  computed: {
    searchable() {
      return this.column.searchable && (_.isVarName(this.column.varName) || _.isInt(this.column.varName));
    },
    sortable() {
      return this.column.sortable && (_.isVarName(this.column.varName) || _.isInt(this.column.varName));
    },
    noRights() {
      return !this.searchable && !this.sortable;
    },
    isSpecial() {
      return _.isString(this.column.special) && [v.spCheckbox, v.spRowNumber].includes(this.column.special);
    },
    isSpCheckbox() {
      return this.column.special === v.spCheckbox;
    },
    isSpNumber() {
      return this.column.special === v.spRowNumber;
    },
  }
};
</script>

<style scoped></style>
