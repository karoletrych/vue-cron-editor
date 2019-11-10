<template>
    <div class="inline">
        Every
        <v-select
          dense
          :items="Array(31).fill(0).map(Number.call, Number)"
          @change="notifyParent"
          />
        day(s) at
        <v-select
          dense
          :items="Array(24).fill(0).map(Number.call, Number)"
          @change="notifyParent"
          />
        <v-select
          dense
          :items="Array(60).fill(0).map(Number.call, Number)"
          @change="notifyParent"
          />
    </div>
</template>

<script>

export default {
  name: 'Daily',
  inject: ["eventBus"],
  computed: {

  },
  data: () => ({

  }),
  methods:{
    notifyParent(newValue){
      const event = {type: "daily", minutes: newValue};
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