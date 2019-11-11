<template>
  <v-app>
    <VueCronEditor v-model="cronExpression">
      <template #select="{items, onChange, inputEvents}">
        <v-select dense
          :items="items"
          @change="onChange"
          v-on="inputEvents"
          />
      </template>
      <template #checkbox="{inputEvents, label, value}">
        <v-checkbox 
          v-on="inputEvents" 
          :label="label" 
          :value="value">
        </v-checkbox>
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

          <v-tab-item :value="3">
            <v-card flat tile>
              <Weekly />
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
import Weekly from "./components/Weekly";
import CronDisplay from "./components/CronDisplay";

export default {
  name: "App",
  components: {
    VueCronEditor,
    Minutes,
    Hourly,
    Daily,
    Weekly,
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
