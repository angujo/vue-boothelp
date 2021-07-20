<template>
  <div class="accordion-item">
    <slot name="header" :target="id">
      <h2 class="accordion-header" :id="'h'+id">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+id" aria-expanded="false"
                :aria-controls="id">
          <span v-html="title"/>
        </button>
      </h2>
    </slot>
    <div :id="id" class="accordion-collapse collapse" :aria-labelledby="'h'+id" :data-bs-parent="parentId && !open?'#'+parentId:null">
      <div class="accordion-body">
        <slot>#AccordionBody</slot>
      </div>
    </div>
  </div>
</template>

<script>
import _ from './../../helpers';

export default {
  name: "AccordionItem",
  props: {title: {type: String, default: '#AccordionTitle'}},
  computed: {
    id() {
      return _.mathRand('acc')
    },
    parentId() {
      return _.isString(this.$parent.id) ? this.$parent.id : this.$parent.$parent.id;
    },
    open() {
      return _.isBoolean(this.$parent.open) ? this.$parent.open : this.$parent.$parent.open;
    }
  }
}
</script>

<style scoped>

</style>