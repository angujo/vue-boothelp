<template>
  <div>
    <nav>
      <div class="nav nav-tabs" role="tablist">
        <button v-for="(tab,i) in tabList" :class="['nav-link',active===i?'active':'']" :id="tab.id+'-tab'" data-bs-toggle="tab"
                :data-bs-target="'#'+tab.id" type="button" role="tab" @click="selectTab(i)" :key="tab.id"
                :aria-controls="tab.id" :aria-selected="i===selectedIndex?'true':'false'"><span v-html="tab.title"/>
        </button>
      </div>
    </nav>
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
    modelValue: {
      type: [String, Number],
    },
  }, setup(props, {emit}) {
    const active = computed(() => props.modelValue);
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
    return {selectedIndex: 0, t: null, tabList: []}
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

<style scoped></style>
