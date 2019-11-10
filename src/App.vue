<template>
  <v-app>
    <VueCronEditor v-model="cronExpression">
      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in tabs" :key="tab">{{tab}}</v-tab>

        <v-tab-item :value="0">
          <v-card flat tile>
            <Minutes />
          </v-card>
        </v-tab-item>

        <v-tab-item :value="1">
          <v-card flat tile>
            <Hourly />
          </v-card>
        </v-tab-item>

        <v-tab-item :value="2">
          <v-card flat tile>
            <Daily />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </VueCronEditor>
  </v-app>
</template>

<script>
import VueCronEditor from "./components/VueCronEditor";
import Minutes from "./components/Minutes";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
// import CronDisplay from "./components/CronDisplay";

export default {
  name: "App",
  components: {
    VueCronEditor,
    Minutes,
    Hourly,
    Daily
  },
  mounted() {
    this.cronExpression = "8 0/5 1/1 * ?";
  },
  data: () => ({
    cronExpression: null,
    text: "dasdas",
    activeTab: null,
    tabs: [
      "Minutes",
      "Hourly",
      "Daily",
      "Weekly",
      "Monthly",
      "Yearly",
      "Advanced"
    ]
  })
};
</script>
