<template>
  <div :class="['tab-pane fade',isActive?'show active':'']" :id="id" role="tabpanel" :aria-labelledby="id+'-tab'">
    <template v-if="showSlot">
      <slot/>
    </template>
  </div>
</template>

<script>
import _                                                   from './../../helpers';
import {computed, getCurrentInstance, inject, watchEffect} from "vue";

export default {
  name: "Tab",
  props: {title: {type: String, default: '#TabTitle'}, lazy: Boolean},
  setup(props) {
    const instance = getCurrentInstance();
    const {tabs, active} = inject("vcTabs");

    const index = computed(() =>
        tabs.value.findIndex((target) => target.uid === instance.uid)
    );
    const isActive = computed(() => index.value === active.value);

    watchEffect(() => {
      if (index.value === -1) {
        tabs.value.push(instance);
      }
    });

    return {
      isActive,
    };
  },
  computed: {
    id() {
      return 'tab' + _.md5(this.title);
    },
    showSlot() {
      return !this.lazy || (this.lazy && this.isActive);
    }
  }
};
</script>

<style scoped></style>
