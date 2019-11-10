<script>
import Vue from "vue";

export default {
  name: "VueCronEditor",
  mounted() {
  },
  provide(){
    const eventBus = new Vue();
    eventBus.$on("expressionChanged", this.updateExpression);
    return {eventBus};
  },
  data: () => ({
    value: { type: String }
  }),
  methods: {
    updateExpression(newValue) {
      this.value = newValue;
      this.$emit("update:value", newValue);
    }
  },
  render() {
    return this.$slots.default;
  }
};
</script>
