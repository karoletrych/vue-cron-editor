<script>

export default {
  name: "VueCronEditor",
  mounted() {
    EventBus.$on("expressionChanged", this.updateExpression);
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
