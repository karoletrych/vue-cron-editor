<script>
import Vue from "vue";
import {calculateExpression} from "./calculateExpression";

export default {
  name: "VueCronEditor",
  provide(){
    const eventBus = new Vue();
    eventBus.$on("expressionChanged", this.updateExpression);
    return {eventBus};
  },
  data: () => ({
    value: { type: String }
  }),
  methods: {
    updateExpression(event){
      const newExpression = calculateExpression(event);

      this.value = newExpression;
      this.$emit("input", newExpression);
    }
  },
  render() {
    return this.$slots.default;
  }
};
</script>
