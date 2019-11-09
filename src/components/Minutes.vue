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
import {calculateExpression} from "./ExpressionCalculator"

export default {
  name: 'Minutes',
  computed: {

  },
  data: () => ({
    vueCronEditorTab: true
  }),
  methods:{
    notifyParent(newValue){
      const expression = calculateExpression({type: "minutes", minutes: newValue});
      this.$emit("vuecroneditor:expressionChanged", {value: expression})
    }
  }
}
</script>

<style>
.minutes{
    display: inline-flex
}
</style>