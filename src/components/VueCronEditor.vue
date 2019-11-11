<script>
import Vue from "vue";
import {calculateExpression} from "./calculateExpression";

export default {
  name: "VueCronEditor",
  provide(){
    const eventBus = new Vue();
    eventBus.$on("expressionChanged", this.updateExpression);
    
    const selectImplementation = this.$vnode.data.scopedSlots.select;
    const checkboxImplementation = this.$vnode.data.scopedSlots.checkbox;
    return {eventBus, selectImplementation, checkboxImplementation};
  },
  mounted(){
    this
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
  render(h){
    return this.$slots.default;
  }
};
</script>
