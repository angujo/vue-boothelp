<template>
  <date-picker v-model="dValue" :is-range="range" :mode="mode">
    <template v-slot="{ inputValue, inputEvents }" v-if="!time || calendar">
      <template v-if="range">
        <div class="d-flex align-items-center">
          <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              class="form-control"
          />
          <span class="bi-chevron-right"></span>
          <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="form-control"
          />
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

export default {
  name: "DatetimeInput",
  components: {DatePicker},
  props: {
    range: Boolean,
    calendar: Boolean,
    date: Boolean,
    time: Boolean,
    datetime: Boolean,
  },
  data() {return {dValue: null}},
  computed: {
    mode() {
      return this.time ? 'time' : (this.date ? 'date' : 'dateTime');
    },
  },
  mounted() {
    if (this.range) this.dValue = {start: new Date(), end: (new Date())};
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
