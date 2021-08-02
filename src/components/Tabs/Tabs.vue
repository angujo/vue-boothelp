<template>
  <div :class="[vertical?'d-flex align-items-start':'']">
    <div role="tablist" :class="['nav position-relative',vertical?'nav-pills flex-column me-3':'nav-tabs']"
         :aria-orientation="vertical?'vertical':null">
      <template v-for="(tab, i) in tabs"     :key="tab.id">
        <button type="button"
                :data-bs-toggle="vertical?'pill':'tab'"
                :id="tab.id+'-tab'"
                :class="['nav-link',tab.isActive?'active':'', tab.isDisabled ? 'disabled' : '', ]"
                :aria-disabled="tab.isDisabled"
                :aria-controls="tab.id"
                :aria-selected="tab.isActive"
                role="tab"
                @click="selectTab(tab.hash, $event)">
          <span v-html="tab.title" :class="[rotate?'vb_tabs_rot_270':'']" :aria-controls="tab.id"/>
        </button>
      </template>
    </div>
    <div :class="['tab-content p-3',vertical?'col':'']">
      <slot/>
    </div>
  </div>
</template>

<script>
import {reactive, provide, onMounted, toRefs} from 'vue';

export default {
  name: "Tabs",
  props: {
    vertical: {type: Boolean, default: false},
    rotate: {type: Boolean, default: false},
    cacheLifetime: {
      default: 5,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({
        useUrlFragment: true,
        defaultTabHash: null,
      }),
    },
  },
  emits: ['changed', 'clicked'],
  setup(props, context) {
    const state = reactive({
      activeTabHash: '',
      lastActiveTabHash: '',
      id: '',
      title: '',
      tabs: []
    })
    provide('tabsProvider', state)
    // const storageKey = `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`
    const selectTab = (selectedTabHash, event) => {
      if (event && !props.options.useUrlFragment) {
        event.preventDefault();
      }
      const selectedTab = findTab(selectedTabHash);
      if (!selectedTab) {
        return;
      }
      if (event && selectedTab.isDisabled) {
        event.preventDefault();
        return;
      }
      if (state.lastActiveTabHash === selectedTab.hash) {
        context.emit('clicked', {tab: selectedTab});
        return;
      }
      state.tabs.forEach(tab => {
        tab.isActive = (tab.hash === selectedTab.hash);
      });
      context.emit('changed', {tab: selectedTab});
      state.lastActiveTabHash = state.activeTabHash = selectedTab.hash;
      //  expiringStorage.set(storageKey, selectedTab.hash, props.cacheLifetime);
    }
    const findTab = (hash) => {
      return state.tabs.find(tab => tab.hash === hash);
    }
    onMounted(() => {
      if (!state.tabs.length) {
        return;
      }
      window.addEventListener('hashchange', () => selectTab(window.location.hash));
      if (findTab(window.location.hash)) {
        selectTab(window.location.hash);
        return;
      }
      /* const previousSelectedTabHash = expiringStorage.get(storageKey);
       if (findTab(previousSelectedTabHash)) {
         selectTab(previousSelectedTabHash);
         return;
       }*/
      if (props.options.defaultTabHash && findTab("#" + props.options.defaultTabHash)) {
        selectTab("#" + props.options.defaultTabHash);
        return;
      }
      selectTab(state.tabs[0].hash);
    })
    return {
      ...toRefs(state),
      selectTab,
      findTab
    }
  },
}
</script>

<style scoped>
.vb_tabs_rot_270 {
  text-orientation: mixed;
  writing-mode: vertical-rl;
  padding: 8px 5px;
  line-height: 1;

  -ms-transform: rotate(180deg); /* IE 9 */
  -moz-transform: rotate(180deg); /* Firefox */
  -webkit-transform: rotate(180deg); /* Safari and Chrome */
  -o-transform: rotate(180deg); /* Opera */
  transform: rotate(180deg);
}
</style>