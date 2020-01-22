<template>
  <div id="app">
    <VueCronEditorBuefy
        v-model="sample1CronExpression"
    ></VueCronEditorBuefy>
    {{sample1CronExpression}}
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import VueCronEditorBuefy from 'vue-cron-editor-buefy'
export default {
  name: 'app',
  components: {
    HelloWorld,
    VueCronEditorBuefy
  },
  data: () => ({
    sample1CronExpression: "4 4 * * 0,2,3,5"
  })
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
