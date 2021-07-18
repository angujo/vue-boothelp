<template>
  <div class="container-fluid">
    <div class="row justify-content-between align-items-center">
      <div class="col-sm-12 col-md-auto small text-muted">
        <div class="dataTables_info" role="status" aria-live="polite">
          <span v-if="pg_config.totalItems>0">{{ pg_config.startIndex + 1 }} to {{ pg_config.endIndex + 1 }} of {{
              pg_config.totalItems
            }}</span>
          <span v-else>0 Records</span>
        </div>
      </div>
      <div class="col-sm-12 col-md-auto" v-if="pages.length>1">
        <div class="dataTables_paginate paging_simple_numbers">
          <ul class="pagination pagination-sm m-0">
            <pagination-button class="paginate_button page-item" @paged="newPage" v-for="pg in pages" v-bind="pg" :key="keyed(pg)"/>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationButton from "./PaginationButton";
import _                from './../../../helpers';

export default {
  name: "TableFooter",
  components: {PaginationButton},
  props: {
    total: {type: [Number, String], default: 0},
    page: {type: [Number, String], default: 1},
    perPage: {type: [Number, String], default: 10}
  },
  data() {
    return {
      pg_config: {
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        startPage: 0,
        endPage: 0,
        startIndex: 0,
        endIndex: 0,
        pages: []
      }
    }
  },
  computed: {
    current() {
      return parseInt(this.page)
    },
    pages() {
      let pg_config = this.pg_config, pg = pg_config.pages, pgs = [];
      pgs = pg.map(p => {
        return {txt: p, page: p, isActive: this.current === p}
      });
      if (pg_config.endPage < pg_config.totalPages) {
        pgs.push({txt: '<i class="bi-chevron-right"/>', page: pg_config.endPage + 1, isActive: false});
        if ((pg_config.endPage + 2) < pg_config.totalPages) pgs.push({
          txt: '<i class="bi-chevron-bar-right"/>',
          page: pg_config.totalPages,
          isActive: false
        });
      }
      if (pg_config.startPage > 1) {
        pgs.unshift({txt: '<i class="bi-chevron-left"/>', page: pg_config.startPage - 1, isActive: false});
        if ((pg_config.startPage - 2) > 1) pgs.unshift({txt: '<i class="bi-chevron-bar-left"/>', page: 1, isActive: false});
      }
      return pgs;
    }
  },
  methods: {
    newPage(pg) {
      this.$emit('paged', pg, (parseInt(pg) - 1) * this.pg_config.pageSize);
    },
    keyed(pg) {
      return _.mathRand(pg.txt + pg.page);
    },
    paginate(totalItems, currentPage, pageSize, maxPages) {
      currentPage = parseInt(currentPage) || 1;
      pageSize = parseInt(pageSize) || 10;
      maxPages = parseInt(maxPages) || 7;
      // calculate total pages
      let totalPages = Math.ceil(totalItems / pageSize);

      // ensure current page isn't out of range
      if (currentPage < 1) {
        currentPage = 1;
      }
      else if (currentPage > totalPages) {
        currentPage = totalPages;
      }

      let startPage, endPage;
      if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
      }
      else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
        }
        else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
          // current page near the end
          startPage = totalPages - maxPages + 1;
          endPage = totalPages;
        }
        else {
          // current page somewhere in the middle
          startPage = currentPage - maxPagesBeforeCurrentPage;
          endPage = currentPage + maxPagesAfterCurrentPage;
        }
      }

      // calculate start and end item indexes
      let startIndex = (currentPage - 1) * pageSize;
      let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

      // return object with all pager properties required by the view
      this.pg_config.totalItems = totalItems;
      this.pg_config.currentPage = currentPage;
      this.pg_config.pageSize = pageSize;
      this.pg_config.totalPages = totalPages;
      this.pg_config.startPage = startPage;
      this.pg_config.endPage = endPage;
      this.pg_config.startIndex = startIndex;
      this.pg_config.endIndex = endIndex;
      this.pg_config.pages = pages;
      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
    }
  },
  mounted() {
    this.paginate(this.total, this.page, this.perPage);
  },
  watch: {
    page(v) {
      this.paginate(this.total, this.page, this.perPage);
    },
    perPage(v) {
      this.paginate(this.total, this.page, this.perPage);
    },
    total(v) {
      this.paginate(this.total, this.page, this.perPage);
    }
  }
}
</script>

<style scoped>

</style>
