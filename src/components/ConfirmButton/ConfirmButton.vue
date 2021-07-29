<template>
  <button type="button" @click="show">
    <slot>#ConfirmButton</slot>
    <teleport to="body">
      <div class="modal fade" ref="cmodal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
           aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header" v-if="!progress && !noHeader">
              <div class="modal-title">
                <slot name="title">
                  <h5 v-html="title"/>
                </slot>
              </div>
            </div>
            <div class="modal-body">
              <div class="progress" v-if="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
                     aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
              </div>
              <div class="small text-danger fst-italic" v-else-if="error"><span v-html="error"/>
                <div class="small fst-italic">Closing in ({{ tTime }})...</div>
              </div>
              <template v-else>
                <slot name="body">#ModalBody...</slot>
              </template>
            </div>
            <div class="modal-footer" v-if="!progress">
              <button type="button" class="btn btn-secondary" @click="cancelled">Cancel</button>
              <button type="button" class="btn btn-primary" @click="confirm">{{ confirmText }}</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </button>
</template>

<script>
import _                 from "./../../helpers";
import helpers           from "./../../mixin-helper";
import NotificationMixin from "./../Notification/NotificationMixin";

export default {
  name: "ConfirmButton",
  emits: ['cancelled', 'confirmed', 'error', 'confirmHidden', 'cancelHidden','hidden'],
  mixins: [NotificationMixin],
  props: {
    title: String, data: Object, headers: Object, params: Object, url: String, noHeader: Boolean,
    confirmText: {type: String, default: 'Confirm'}, noNotification: Boolean
  },
  data() {
    return {elm: null, modal: null, progress: false, error: null, tick: null, tTime: 5, confirmed: false}
  },
  methods: {
    ...helpers,
    async getData() {
      this.error = null;
      this.progress = true;
      let p = {}, _p = {},
          h = {'X-Requested-With': 'XMLHttpRequest'};
      if (_.isPlainObject(this.data)) p = Object.assign({}, p, this.data);
      if (_.isPlainObject(this.headers)) h = Object.assign({}, h, this.headers);
      if (_.isPlainObject(this.params)) _p = Object.assign({}, _p, this.params);
      this.$http({
        method: 'post',
        url: this.url,
        headers: h,
        params: _p,
        data: p
      })
          .then(resp => {
            this.content = resp.data;
            if (_.isString(resp.data) && !this.noNotification) this.notifySuccess(resp.data);
            this.$emit('confirmed', this.content);
            this.confirmed = true;
            this.hide();
          })
          .catch(er => {
            if (!this.noNotification) this.notifyError(this.logGetError(er));
            this.$emit('error', this.error = this.logGetError(er));
            this.tick = setInterval(() => {
              this.tTime--;
              if (this.tTime === 0) {
                this.hide();
              }
            }, 1000);
          })
          .then(d => {
            this.progress = false;
          });
    },
    confirm() {
      if (this.url) this.getData();
      else {
        this.$emit('confirmed');
        this.confirmed = true;
        this.hide();
      }
    },
    cancelled() {
      this.$emit('cancelled');
      this.hide();
    },
    show() {
      this.modal.show();
    },
    hide() {
      this.modal.hide();
    },
  }
  ,
  mounted() {
    this.elm = this.$refs.cmodal;
    this.modal = new bootstrap.Modal(this.elm, {
      keyboard: true, backdrop: 'static', focus: true
    });
    this.elm.addEventListener('hidden.bs.modal', e => {
      this.tTime = 5;
      this.error = null;
      if (this.tick) clearInterval(this.tick);
      this.$emit('hidden');
      if (this.confirmed) this.$emit('confirmHidden');
      else this.$emit('cancelHidden');
      this.confirmed = false;
    });
  }
}
;
</script>

<style scoped></style>
