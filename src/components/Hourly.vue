<template>
    <div class="inline">
        Every
        <v-select
          dense
          :items="Array(24).fill(0).map(Number.call, Number)"
          v-model="hours"
          />
        hour(s) on minute
        <v-select
          dense
          :items="Array(60).fill(0).map(Number.call, Number)"
          v-model="minutes"
          />
    </div>
</template>

<script>

export default {
  name: 'Hourly',
  inject: ["eventBus"],
  computed: {

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