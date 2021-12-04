<template>
    <div>
        <vue-cron-editor-oruga></vue-cron-editor-oruga>
    </div>
</template>

<script>
import VueCronEditorOruga from "./VueCronEditorOruga.vue"

export default {
    name: "App",
    components: {
      VueCronEditorOruga
    },
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
