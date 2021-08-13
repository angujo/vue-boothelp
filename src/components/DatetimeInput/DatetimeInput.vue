<template>
  <date-picker v-model="dValue" :is-range="range" :mode="mode">
    <template v-slot="{ inputValue, inputEvents }" v-if="!time || calendar">
      <template v-if="range">
        <div class="d-flex align-items-center">
          <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              class="form-control"/>
          <span class="bi-chevron-right"></span>
          <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="form-control"/>
        </div>
      </template>
      <input
          class="form-control"
          :value="inputValue"
          v-on="inputEvents" v-else/>
    </template>
  </date-picker>
</template>

<script>
import {DatePicker} from 'v-calendar';
import _            from './../../helpers';

export default {
  name: "DatetimeInput",
  components: {DatePicker},
  emits: ['update:modelValue'],
  props: {
    modelValue: null,
    range: Boolean,
    calendar: Boolean,
    date: Boolean,
    time: Boolean,
    datetime: Boolean,
    startProp: {type: String, default: 'start_date'},
    endProp: {type: String, default: 'end_date'},
  },
  data() {return {dValue: null, ignore: false}},
  methods: {
    setDate() {
      if (this.range) {
        this.dValue = {start: new Date(), end: (new Date())};
        let s = this.startProp, e = this.endProp;
        if (Array.isArray(this.modelValue)) {
          s = 0;
          e = 1;
        }
        this.dValue.start = this.modelValue[s] && _.isValidDate(this.modelValue[s]) ? new Date(this.modelValue[s]) : new Date();
        this.dValue.end =
            this.modelValue[e] && _.isValidDate(this.modelValue[e]) ? new Date(this.modelValue[e]) : _.addDays(this.dValue.start, 7);
      }
      else this.dValue = this.modelValue;
      this.ignore = false;
    }
  },
  computed: {
    mode() {
      return this.time ? 'time' : (this.date ? 'date' : 'dateTime');
    },
  },
  watch: {
    modelValue(v) {
      this.ignore = true;
      this.setDate();
    },
    dValue(v) {
      if (this.ignore) {
        return;
      }
      let nv = v;
      if (this.range) {
        if (Array.isArray(this.modelValue)) nv = [v.start, nv.end];
        else {
          nv = this.modelValue;
          nv[this.startProp] = v.start;
          nv[this.endProp] = v.end;
        }
      }
      this.$emit('update:modelValue', nv);
    }
  },
  mounted() {
    this.setDate();
  }
};
</script>

<style scoped>
.vbh_prog_overlay {
  top: 0;
  bottom: 0;
  width: 100%;
  position: absolute;
}
</style>
