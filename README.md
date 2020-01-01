# vue-cron-editor
VueCronEditor is a component library built with Vue & Vuetify allowing for easier editing of CRON expressions.

# Demo
https://karoletrych.github.io/vue-cron-editor/

# Requirements
- Vue ^2.0
- Vuetify ^2.0

# Installation
```
npm install vue-cron-editor --save
```

# Usage
```
<template>
  <v-app>
    <v-content>
      <VueCronEditor v-model="cronExpression"/>
      {{cronExpression}}
    </v-content>
  </v-app>
</template>

<script>
import VueCronEditor from 'vue-cron-editor';

export default {
  name: 'App',
  components: {
    VueCronEditor
  },
  data: () => ({
      cronExpression: "*/1 * * * *"
  }),
};
</script>
```
The editor tab will be set to one which is able to represent an initial expression given to a ``value`` prop (**minutes** tab in the example above). 
If none of the tabs can represent the given expression then **advanced** tab is selected.

# i18n
The language of the component can be selected with the ``locale`` prop.
```
<vue-cron-editor
    v-model="expression"
    locale="pl"
></vue-cron-editor>
```
Currently supported languages:
- en
- pl

Custom locales can be provided via a ``customLocales`` prop:
```
<vue-cron-editor
    v-model="expression"
    locale="test"
    :custom-locales="{
    test: {
        every: "Every",
        minutes: "minute(s)",
        hoursOnMinute: "hour(s) on minute",
        daysAt: "day(s) at",
        at: "at",
        onThe: "On the",
        dayOfEvery: "day of every",
        monthsAt: "month(s) at",
        everyDay: "Every",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat",
        sun: "Sun",
        hasToBeBetween: "Has to be between",
        and: "and"
    }
}"
></vue-cron-editor>
```
