<template>
  <button type="button" class="btn btn-outline-secondary" @click="show">
    <slot>#ModalButton</slot>
    <modal ref="myModal" @hidden="hidden" @hide="modal=false" @shown="$emit('shown')" :toggle="modal" :key="mKey"
           :url="url"
           :iframe-url="iframeUrl"
           :title="title"
           :frameless="frameless"
           :backdrop="backdrop"
           :keyboard="keyboard"
           :focus="focus"
           :footer="footer"
           :centered="centered"
           :scrollable="scrollable"
           :large="large"
           :small="small"
           :extra-large="extraLarge"
           :fullscreen="fullscreen"
           :fullscreen-sm="fullscreenSm"
           :fullscreen-md="fullscreenMd"
           :fullscreen-lg="fullscreenLg"
           :fullscreen-xl="fullscreenXl"
           :fullscreen-xxl="fullscreenXxl">
      <template #header="{hide}">
        <slot name="header" :hide="hide"/>
      </template>
      <template #default="{hide}">
        <slot name="body" :hide="hide"/>
      </template>
      <template #footer="{hide}">
        <slot name="footer" :hide="hide"/>
      </template>
    </modal>
  </button>
</template>

<script>
import Modal from "../Modal/Modal";
import _     from './../../helpers';

export default {
  name: "ModalButton",
  emits: ['hidden', 'shown'],
  components: {Modal},
  props: {
    url: {type: String, default: null},
    iframeUrl: {type: String, default: null},
    backdrop: {type: [Boolean, String], default: 'static'},
    keyboard: {type: Boolean, default: false},
    focus: {type: Boolean, default: true},
    footer: {type: Boolean, default: false},
    centered: {type: Boolean, default: false},
    scrollable: {type: Boolean, default: false},
    toggle: {type: Boolean, default: false},
    large: Boolean, small: Boolean, extraLarge: Boolean, fullscreen: Boolean, frameless: Boolean, title: String,
    fullscreenSm: Boolean, fullscreenMd: Boolean, fullscreenLg: Boolean, fullscreenXl: Boolean, fullscreenXxl: Boolean,
  },
  data() {
    return {modal: false}
  },
  methods: {
    show() {
      this.modal = true;
    },
    hidden() {
      this.$emit('hidden');
      this.modal = false;
    }
  },
  computed: {
    mKey() {
      return _.mathRand('mbky')
    },
  },
  mounted() {
  }
};
</script>

<style scoped></style>
