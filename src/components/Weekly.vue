<template>
  <div class="inline">
    <AbstractCheckbox v-model="days" value="Mon" label="Mon" />
    <AbstractCheckbox v-model="days" value="Tue" label="Tue" />
    <AbstractCheckbox v-model="days" value="Wed" label="Wed" />at
    <AbstractSelect :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />
    <AbstractSelect :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
  </div>
</template>

<script>
import AbstractSelect from "./AbstractSelect";
import AbstractCheckbox from "./AbstractCheckbox";

export default {
  name: "Weekly",
  inject: ["eventBus"],
  components: {
    AbstractSelect,
    AbstractCheckbox
  },
  data: () => ({
    minutes: null,
    hours: null,
    days: []
  }),
  watch: {
    minutes() {
      this.notifyParent();
    },
    hours() {
      this.notifyParent();
    },
    days() {
      this.notifyParent();
    }
  },
  methods: {
    notifyParent() {
      const event = {
        type: "weekly",
        hours: this.hours,
        minutes: this.minutes,
        days: this.days
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