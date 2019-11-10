<template>
  <v-app>
    <VueCronEditor v-model="cronExpression">
      
      <template #select="{items, onChange}">
        <v-select
          @change="onChange"
          dense
          :items="items"
          />
      </template>

      <div>
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
        <CronDisplay :value="cronExpression" />
      </div>
    </VueCronEditor>
  </v-app>
</template>

<script>
import VueCronEditor from "./components/VueCronEditor";
import Minutes from "./components/Minutes";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";
import CronDisplay from "./components/CronDisplay";

export default {
  name: "App",
  components: {
    VueCronEditor,
    Minutes,
    Hourly,
    Daily,
    CronDisplay
  },
  mounted() {},
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
