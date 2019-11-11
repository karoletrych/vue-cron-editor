<template>
    <div class="inline">
        Every
        <AbstractSelect
          :items="Array(24).fill(0).map(Number.call, Number)"
          v-model="hours"
          />
        hour(s) on minute
        <AbstractSelect
          :items="Array(60).fill(0).map(Number.call, Number)"
          v-model="minutes"
          />
    </div>
</template>

<script>
import AbstractSelect from "./AbstractSelect";

export default {
  name: 'Hourly',
  inject: ["eventBus"],
  components: {
    AbstractSelect
  },
  data: () => ({
    minutes: null,
    hours: null
  }),
  watch:{
    minutes(){
      this.notifyParent();
    },
    hours(){
      this.notifyParent();
    }
  },
  methods:{
    notifyParent(){
      const event = {type: "hourly", hours: this.hours, minutes: this.minutes};
      this.eventBus.$emit("expressionChanged", event)
    }
  }
}
</script>

<style>
.inline{
    display: inline-flex
}
</style>