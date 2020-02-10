[![Actions Status](https://github.com/karoletrych/vue-cron-editor/workflows/Node%20CI/badge.svg)](https://github.com/karoletrych/vue-cron-editor/actions)
# vue-cron-editor
VueCronEditor is a component library built with Vue allowing for easier editing of CRON expressions.

# Demo
https://karoletrych.github.io/vue-cron-editor/

# Requirements
- Vue ^2.0

# Installation
There are currently two versions available:
- vue-cron-editor-buefy **(RECOMMENDED)**
```
npm install vue-cron-editor-buefy --save
```

- vue-cron-editor-vuetify
    - **NOTE**: Requires your application to use Vuetify ^2.0 and have your components wrapped inside `<v-app>` element.
```
npm install vue-cron-editor-vuetify --save
```

# Usage
```
<template>
  <v-app>
    <v-content>
      <VueCronEditorBuefy v-model="cronExpression"/>
      {{cronExpression}}
    </v-content>
  </v-app>
</template>

<script>
import VueCronEditorBuefy from 'vue-cron-editor-buefy';

export default {
  name: 'App',
  components: {
    VueCronEditorBuefy
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
<VueCronEditorBuefy
    v-model="expression"
    locale="pl"
></VueCronEditorBuefy>
```
Currently supported languages:
- en
- pl

Custom locales can be provided via a ``customLocales`` prop:
```
<VueCronEditorBuefy
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
></VueCronEditorBuefy>
```

# Contributing
To build the demo/samples app run in root directory:
```
npm install
npm run serve
```

For testing the built packages:
```
npm install
cd src/vuetify
npm run pack
cd ../buefy
npm run pack

cd ../../test_app
npm install
npm run serve
```
