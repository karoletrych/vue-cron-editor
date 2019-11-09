<script>
export default {
  name: "VueCronEditor",
  mounted() {
    debugger;
    const childrenTabs = this.$children.filter(child => child.vueCronEditorTab);
    childrenTabs.forEach(tab =>
      tab.$on("vuecroneditor:expressionChanged", this.updateExpression)
    );
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
