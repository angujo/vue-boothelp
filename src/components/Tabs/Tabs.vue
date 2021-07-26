<template>
  <div :class="[vertical?'d-flex align-items-start':'']">
    <div :class="['nav position-relative',vertical?'nav-pills flex-column me-3':'nav-tabs']" role="tablist"
         :aria-orientation="vertical?'vertical':null">
      <button v-for="(tab,i) in tabList" :class="['nav-link',rotate?'vb_tabs_rot_270':'',active===i?'active':'']" :id="tab.id+'-tab'"
              :data-bs-toggle="vertical?'pill':'tab'"
              :data-bs-target="'#'+tab.id" type="button" role="tab" @click="selectTab(i)" :key="tab.id"
              :aria-controls="tab.id" :aria-selected="i===selectedIndex?'true':'false'"><span v-html="tab.title"/>
      </button>
    </div>
    <div class="tab-content p-3">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import _ from './../../helpers';
import {computed, provide, ref} from "vue";

export default {
  name: "Tabs",
  props: {
    vertical: Boolean,
    rotate: Boolean,
    modelValue: {
      type: [String, Number],
    },
  },
  setup(props, {emit}) {
    const ind = props.modelValue || 0;
    const active = computed(() => ind);
    const tabs = ref([]);

    function selectTab(tab) {
      emit("update:modelValue", tab);
    }

    provide("vcTabs", {
      active,
      tabs,
    });

    return {
      tabs,
      active,
      selectTab,
    };
  },
  data() {
    return {selectedIndex: 0, t: null,}
  },
  methods: {
    selectOne(i) {
      this.selectedIndex = i;
    }
  },
  computed: {
    tabList() {
      return this.tabs.map(c => {
        c.props.isActive = true;
        return {id: 'tab' + _.md5(c.props.title), title: c.props.title};
      });
    }
  },
  mounted() {
    this.selectOne(0);
  },
  beforeMount() {
    /*this.tabs = this.$slots.default().filter((child) => child.type.name === "Tab").map(c => {
      c.props.isActive = true;
      return {id: 'tab' + _.md5(c.props.title), title: c.props.title};
    });*/
  },
  created() {
  }
};
</script>

<style scoped>
.vb_tabs_rot_270 {
  text-orientation: mixed;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  padding: 8px 5px;
  line-height: 1;
}
</style>
