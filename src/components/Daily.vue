<template>
  <div class="inline">
    Every
    <AbstractSelect :items="Array(31).fill(0).map(Number.call, Number)" v-model="dayInterval" />day(s) at
    <AbstractSelect :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />
    <AbstractSelect :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
  </div>
</template>

<script>
import AbstractSelect from "./AbstractSelect";

export default {
  name: "Daily",
  components: { AbstractSelect },
  inject: ["eventBus"],
  data: () => ({
    dayInterval: null,
    minutes: null,
    hours: null
  }),
  watch: {
    dayInterval() {
      this.notifyParent();
    },
    hours() {
      this.notifyParent();
    },
    minutes() {
      this.notifyParent();
    }
  },
  methods: {
    notifyParent() {
      const event = {
        type: "daily",
        hours: this.hours,
        minutes: this.minutes,
        dayInterval: this.dayInterval
      };
      this.eventBus.$emit("expressionChanged", event);
    }
  }
};
</script>

<style>
.inline {
  display: inline-flex;
}
</style>