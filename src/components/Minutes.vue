<template>
    <div 
      class="minutes">
        Every
        <AbstractSelect
          @change="notifyParent"
          :items="Array(60).fill(0).map(Number.call, Number)"
          />
        minute(s)
    </div>
</template>

<script>
import AbstractSelect from "./AbstractSelect";

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
  },
  components:{
    AbstractSelect
  }
}
</script>

<style>
.minutes{
    display: inline-flex
}
</style>