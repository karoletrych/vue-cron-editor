<template>
    <div>
        <VueCronEditorOruga 
        v-model="cronExpression"
        :preserve-state-on-switch-to-advanced="true"
        />
        {{cronExpression}}
    </div>
</template>

<script>
import VueCronEditorOruga from "./VueCronEditorOruga.vue"

export default {
    name: "App",
    components: {
      VueCronEditorOruga
    },
    data: () => ({
      cronExpression: "*/1 * * * *"
    }),
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
