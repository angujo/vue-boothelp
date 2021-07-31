<template>
  <div v-show="isActive"
       :aria-hidden="!isActive"
       :class="['tab-pane fade',isActive?'show active':'']"
       :id="computedId"
       role="tabpanel"
       :aria-labelledby="computedId+'-tab'"
       ref="tab">
    <template v-if="showSlot">
      <slot/>
    </template>
  </div>
</template>

<script>
import {inject, watch, ref, onBeforeMount} from 'vue';
import _                                   from './../../helpers';

export default {
  name: "Tab",
  props: {
    id: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const isActive = ref(false)
    const showSlot = ref(false)
    const tabsProvider = inject('tabsProvider')
    const computedId = props.id ? props.id : _.md5(props.title)
    const hash = '#' + (!props.isDisabled ? computedId : '')
    watch(
        () => tabsProvider.activeTabHash,
        () => {
          isActive.value = hash === tabsProvider.activeTabHash;
          showSlot.value = true!==props.lazy || (true===props.lazy && true === isActive.value);
        }
    )
    onBeforeMount(() => {
      tabsProvider.tabs.push({
        title: props.title,
        isDisabled: props.isDisabled,
        hash: hash,
        id: computedId,
        index: tabsProvider.tabs.length
      })
    })
    return {
      computedId,
      hash,
      isActive,
      showSlot
    }
  }
}
</script>

<style scoped>

</style>