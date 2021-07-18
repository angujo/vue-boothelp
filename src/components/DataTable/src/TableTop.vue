<template>
  <div class="d-flex justify-content-between align-items-center flex-nowrap p-2">
    <div>
      <div class="small text-nowrap col-auto small" v-if="!noCounts">
        Show
        <select class="form-control form-control-sm d-inline-block ms-2 me-2" v-model="pageCount">
          <option v-for="s in counts" :key="s" :value="s">{{ s }}</option>
        </select>
        Entries
      </div>
    </div>
    <div>
      <div class="d-flex align-items-center" v-if="!$parent.noSearch">
        Search <input type="text" class="form-control form-control-sm" v-model="search" @keyup.enter="doSearch"/>
        <button type="button" class="btn" @click="doSearch"><i class="bi-search"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableTop",
  props: {
    pageSizes: Array,
  },
  data() {
    return {pageCount: null, counts: this.pageSizes, search: null}
  },
  methods: {
    cleanCounts() {
      if (!Array.isArray(this.counts) || this.counts.length <= 0) this.counts = [10, 15, 30, 50, 100];
      this.counts = this.counts.filter(c => Number.isInteger(c));
      if (this.counts.length <= 0) {
        this.cleanCounts();
        return;
      }
      this.pageCount = this.counts.find(c => c > 0);
    },
    doSearch() {
      let p = {};
      p[this.searchVar] = this.search.trim();
      this.$mitt.emit('onSearch', p);
    }
  },
  computed: {
    noCounts() {
      return this.$parent.noPageSize || this.counts.length === 1
    },
    searchVar() {
      return this.$parent.searchVar;
    }
  },
  watch: {
    pageCount(v) {
      this.$emit('onCount', v);
    }
  },
  mounted() {
    this.cleanCounts();
  }
};
</script>

<style scoped>
select {
  max-width: 35px;
  padding: 3px;
}
</style>
