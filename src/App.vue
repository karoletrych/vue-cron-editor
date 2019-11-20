<template>
  <v-app>
    <SimpleVueCronEditor v-model="cronExpression">

    </SimpleVueCronEditor>
  </v-app>
</template>

<script>
import SimpleVueCronEditor from "./components/SimpleVueCronEditor";

export default {
  name: "App",
  components: {
    SimpleVueCronEditor
  },
  mounted() {},
  data: () => ({
    cronExpression: null,
  })
};
</script>
