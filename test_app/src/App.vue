<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >     
    </v-app-bar>

    <v-content>
        <VueCronEditorVuetify v-model="cron"></VueCronEditorVuetify>
        <VueCronEditorBuefy v-model="cron"></VueCronEditorBuefy>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import VueCronEditorVuetify from 'vue-cron-editor-vuetify';
import VueCronEditorBuefy from 'vue-cron-editor-buefy';

export default {
  name: 'App',

  components: {
    HelloWorld,
    VueCronEditorVuetify,
    VueCronEditorBuefy
  },

  data: () => ({
    cron: "4 4 * * 0,2,3,5",
  }),
};
</script>
