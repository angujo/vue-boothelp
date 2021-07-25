<template>
  <teleport to="body">
    <div class="modal fade" ref="mmodal" tabindex="-1" :key="'ky'+mId" :id="mId">
      <div ref="mdialog" :class="['modal-dialog',size,fsSize,centered?'modal-dialog-centered':'',scrollable?'modal-dialog-scrollable':'']">
        <div class="modal-content">
          <button type="button" v-if="frameless" class="btn-close frameless-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div ref="mhead" class="modal-header d-flex justify-content-between align-items-start" v-if="!frameless && !noHeader">
            <div class="col">
              <slot name="header" :hide="hide">
                <h5 class="modal-title" v-html="title"/>
              </slot>
            </div>
            <div class="col-auto">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
          <div :class="['modal-body',frameless?'p-0':'']" ref="mbody">
            <template v-if="up">
              <iframe :src="iframeUrl" v-if="iframeUrl" :height="vH+'px'" :width="vW+'px'"></iframe>
              <data-load v-else-if="url" :url="url">
                <template #default="{content}">
                  <slot :hide="hide"><span v-if="content" v-html="content.toString()"/></slot>
                </template>
              </data-load>
              <slot :hide="hide" v-else>#Modal Body</slot>
            </template>
          </div>
          <div class="modal-footer" v-if="footer && !frameless" ref="mfoot">
            <slot name="footer" :hide="hide"/>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import _        from './../../helpers';
import axios    from 'axios';
import DataLoad from "./../DataLoad/DataLoad";

export default {
  name: "Modal",
  components: {DataLoad},
  emits: ['show', 'shown', 'hide', 'hidden', 'hidePrevented'],
  props: {
    url: {type: String, default: null},
    iframeUrl: {type: String, default: null},
    backdrop: {type: [Boolean, String], default: 'static'},
    keyboard: {type: Boolean, default: false},
    focus: {type: Boolean, default: true},
    footer: {type: Boolean, default: false},
    frameless: {type: Boolean, default: false},
    noHeader: {type: Boolean, default: false},
    centered: {type: Boolean, default: false},
    scrollable: {type: Boolean, default: false},
    toggle: {type: Boolean, default: false},
    large: Boolean, small: Boolean, extraLarge: Boolean, fullscreen: Boolean, title: String,
    fullscreenSm: Boolean, fullscreenMd: Boolean, fullscreenLg: Boolean, fullscreenXl: Boolean, fullscreenXxl: Boolean,
  },
  data() {
    return {mModal: null, elm: null, vW: 0, vH: 0, up: false}
  },
  methods: {
    getData() {

    },
    show() {
      this.init();
      this.mModal.show();
    },
    hide() {
      this.init();
      this.mModal.hide();
    },
    dispose() {
      this.init();
      this.mModal.dispose();
    },
    instance() {
      this.init();
      return bootstrap.Modal.getInstance(this.elm);
    },
    init() {
      if (this.elm) return;
      this.elm = this.$refs.mmodal;

      this.mModal = new bootstrap.Modal(this.elm, {
        keyboard: this.keyboard, backdrop: this.backdrop, focus: this.focus
      });

      this.elm.addEventListener('show.bs.modal', e => {
        this.up = true;
        this.$emit('show', e);
      });
      this.elm.addEventListener('shown.bs.modal', e => {
        this.resized();
        this.$emit('shown', e);
      });
      this.elm.addEventListener('hide.bs.modal', e => {
        this.up = false;
        this.$emit('hide', e);
      });
      this.elm.addEventListener('hidden.bs.modal', e => {
        this.$emit('hidden', e);
      });
      this.elm.addEventListener('hidePrevented.bs.modal', e => {
        this.$emit('hidePrevented', e);
      });
    },
    elmDim(elm) {
      let cs = getComputedStyle(elm),
          h = 0, w = 0;
      h = elm.clientHeight;  // height with padding
      w = elm.clientWidth;   // width with padding

      h -= parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      w -= parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      return {width: w, height: h};
    },
    headerDim() {
      return this.noHeader || this.frameless ? {width: 0, height: 0} : this.elmDim(this.$refs.mhead);
    },
    footerDim() {
      return this.footer && !this.frameless ? this.elmDim(this.$refs.mfoot) : {width: 0, height: 0};
    },
    resized() {
      if (!this.iframeUrl) return;
      let h = this.headerDim(), f = this.footerDim(), d = this.elmDim(this.$refs.mdialog);
      this.vH = window.innerHeight - ((h.height * 2) + (f.height * 2));
      this.vW = d.width - 20; // Remove the scroll bars
    }
  },
  computed: {
    mId() {
      return 'mid' + _.md5(_.mathRand('modal'));
    },
    fsSize() {
      return this.fullscreenSm ? 'modal-fullscreen-sm-down' :
          (this.fullscreenMd ? 'modal-fullscreen-md-down' :
              (this.fullscreenLg ? 'modal-fullscreen-lg-down' :
                  (this.fullscreenXl ? 'modal-fullscreen-xl-down' :
                      (this.fullscreenXxl ? 'modal-fullscreen-xxl-down' : null))));
    },
    size() {
      return this.fullscreen ? 'modal-fullscreen' :
          (this.extraLarge ? 'modal-xl' :
              (this.large ? 'modal-lg' :
                  (this.small ? 'modal-sm' : null)));
    }
  },
  watch: {
    toggle(v) {
      if (v) this.show();
      else this.hide();
    }
  },
  mounted() {
    this.init();
    window.addEventListener('resize', () => {
      this.resized()
    });
    this.resized();
  },
  created() {
  }
};
</script>

<style scoped>
.frameless-close {
  float: right;
  position: absolute;
  right: -8px;
  top: -13px;
  background-color: #fff !important;
  border-radius: 50%;
  padding: 5px;
  z-index: 99;
}
</style>
