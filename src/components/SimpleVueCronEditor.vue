<template>
  <div class="px-2">
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab">{{tab}}</v-tab>

      <v-tab-item :value="0">
        <v-card class="d-inline-flex pa-2 align-center" outlined tile>
          <div class="px-2">Every</div>
          <v-select
            class="px-2"
            bottom
            v-model="minutes.minutes"
            :items="Array(60).fill(0).map(Number.call, Number)"
          />
          <div class="px-2">minute(s)</div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="1">
        <v-card class="d-inline-flex pa-2 align-center" outlined tile>
          <div class="px-2">Every</div>
          <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hourly.hours" />
          <div class="px-2">hour(s) on minute</div>
          <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="hourly.minutes" />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="2">
        <v-card class="d-inline-flex pa-2 align-center" outlined tile>
          <div class="px-2">Every</div>
          <v-select
            :items="Array(31).fill(0).map(Number.call, Number)"
            v-model="daily.dayInterval"
          />
          <div class="px-2">day(s) at</div>
          <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="daily.hours" />
          <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="daily.minutes" />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="3">
        <v-card outlined class="d-inline-flex pa-2 align-center" tile>
          <div class="px-2">Every</div>
          <div class="d-inline-flex">
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Mon" value="Mon" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Tue" value="Tue" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Wed" value="Wed" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Thu" value="Thu" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Fri" value="Fri" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Sat" value="Sat" />
            <v-checkbox dense class="px-1" v-model="weekly.days" label="Sun" value="Sun" />
          </div>
          <div class="px-2">at</div>
          <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="weekly.hours" />
          <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="weekly.minutes" />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="4">
        <v-card class="d-inline-flex pa-2 align-center" outlined tile>
          <div class="px-2">On the</div>
          <v-select :items="Array(31).fill(0).map(Number.call, Number)" v-model="monthly.day" />
          <div class="px-2">of every</div>
          <v-select
            :items="Array(12).fill(0).map(Number.call, Number)"
            v-model="monthly.monthInterval"
          />
          <div class="px-2">month(s) at</div>
          <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="monthly.hours" />
          <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="monthly.minutes" />
        </v-card>
      </v-tab-item>

      <v-tab-item :value="5">
        <v-card class="d-inline-flex pa-2 align-center" outlined tile>
          <v-text-field v-model="advanced.cronExpression"></v-text-field>
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
    tabs: ["Minutes", "Hourly", "Daily", "Weekly", "Monthly", "Advanced"]
  })
};
</script>

<style>
.inline {
  display: inline-flex;
}
</style>