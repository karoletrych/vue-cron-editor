<template>
    <div 
      class="minutes">
        Every
        <v-select
          @change="notifyParent"
          dense
          :items="Array(60).fill(0).map(Number.call, Number)"
          />
        minute(s)
    </div>
</template>

<script>

export default {
  name: 'Minutes',
  computed: {

  },
  inject: ["eventBus"],
  data: () => ({
    isVueCronEditorTab: true
  }),
  methods:{
    notifyParent(newValue){
      const event = {type: "minutes", minutes: newValue};
      this.eventBus.$emit("expressionChanged", event)
    }
  }
}
</script>

<style>
.minutes{
    display: inline-flex
}
</style>