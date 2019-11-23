<template>
  <div>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab">{{tab}}</v-tab>

      <v-tab-item :value="0">
        <v-card flat tile>
          <div class="inline">
            Every
            <v-select
              v-model="minutes.minutes"
              :items="Array(60).fill(0).map(Number.call, Number)"
            />minute(s)
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="1">
        <v-card flat tile>
          <div class="inline">
            Every
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hourly.hours" />hour(s) on minute
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="hourly.minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="2">
        <v-card flat tile>
          <div class="inline">
            Every
            <v-select
              :items="Array(31).fill(0).map(Number.call, Number)"
              v-model="daily.dayInterval"
            />day(s) at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="daily.hours" />
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="daily.minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="3">
        <v-card flat tile>
          <div class="inline">
            <v-checkbox v-model="weekly.days" label="Mon" />
            <v-checkbox v-model="weekly.days" label="Tue" />
            <v-checkbox v-model="weekly.days" label="Wed" />
            <v-checkbox v-model="weekly.days" label="Thu" />
            <v-checkbox v-model="weekly.days" label="Fri" />
            <v-checkbox v-model="weekly.days" label="Sat" />
            <v-checkbox v-model="weekly.days" label="Sun" />at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="weekly.hours" />
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="weekly.minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="4">
        <v-card flat tile>
          <div class="inline">
            On the
            <v-select
              :items="Array(31).fill(0).map(Number.call, Number)"
              v-model="monthly.day"
            />of every
            <v-select
              :items="Array(12).fill(0).map(Number.call, Number)"
              v-model="monthly.monthInterval"
            />month(s) at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="monthly.hours" />
            <v-select
              :items="Array(60).fill(0).map(Number.call, Number)"
              v-model="monthly.minutes"
            />
          </div>
        </v-card>
      </v-tab-item>

    <v-tab-item :value="5">
        <v-card flat tile>
          <div class="inline">
            <v-text-field v-model="advanced.cronExpression">

            </v-text-field>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
    {{innerValue}}
  </div>
</template>

<script>
import vueCronEditorMixin from "./vueCronEditorMixin";
export default {
  name: "SimpleVueCronEditor",
  mixins: [vueCronEditorMixin],
  data: () => ({
    activeTab: null,
    tabs: [
      "Minutes",
      "Hourly",
      "Daily",
      "Weekly",
      "Monthly",
      "Advanced"
    ]
  })
};
</script>

<style>
.inline {
  display: inline-flex;
}
</style>