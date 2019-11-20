<template>
  <div>
    <v-tabs v-model="activeTab">
      <v-tab v-for="tab in tabs" :key="tab">{{tab}}</v-tab>

      <v-tab-item :value="0">
        <v-card flat tile>
          <div>
            Every
            <v-select @change="notifyParent" :items="Array(60).fill(0).map(Number.call, Number)" />minute(s)
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="1">
        <v-card flat tile>
          <div class="inline">
            Every
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />hour(s) on minute
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="2">
        <v-card flat tile>
          <div class="inline">
            Every
            <v-select :items="Array(31).fill(0).map(Number.call, Number)" v-model="dayInterval" />day(s) at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="3">
        <v-card flat tile>
          <div class="inline">
            <v-checkbox v-model="mon" label="Mon" />
            <v-checkbox v-model="tue" label="Tue" />
            <v-checkbox v-model="wed" label="Wed" />
            <v-checkbox v-model="thu" label="Thu" />
            <v-checkbox v-model="fri" label="Fri" />
            <v-checkbox v-model="sat" label="Sat" />
            <v-checkbox v-model="sun" label="Sun" />at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
          </div>
        </v-card>
      </v-tab-item>

      <v-tab-item :value="4">
        <v-card flat tile>
          <div class="inline">
            On the
            <v-select :items="Array(31).fill(0).map(Number.call, Number)" v-model="dayInterval" />of every
            <v-select :items="Array(12).fill(0).map(Number.call, Number)" v-model="monthInterval" />month(s) at
            <v-select :items="Array(24).fill(0).map(Number.call, Number)" v-model="hours" />
            <v-select :items="Array(60).fill(0).map(Number.call, Number)" v-model="minutes" />
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs>
    <CronDisplay :value="cronExpression" />
  </div>
</template>

<script>
export default {
  name: "SimpleVueCronEditor",
  data: () => ({
    cronExpression: null,
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

<style>
</style>