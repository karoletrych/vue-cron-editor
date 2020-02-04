[![Actions Status](https://github.com/karoletrych/vue-cron-editor/workflows/Node%20CI/badge.svg)](https://github.com/karoletrych/vue-cron-editor/actions)
# vue-cron-editor
VueCronEditor is a component library built with Vue & Vuetify allowing for easier editing of CRON expressions.

# Demo
https://karoletrych.github.io/vue-cron-editor/

# Requirements
- Vue ^2.0

# Installation
There are currently two available implementations:
- vue-cron-editor-vuetify
    - Requires your application to use Vuetify ^2.0 and have your components wrapped inside `<v-app>` element.

- vue-cron-editor-buefy
    - No dependencies.

```
npm install vue-cron-editor-vuetify --save
```
or 
```
npm install vue-cron-editor-buefy --save
```

# Usage
```
<template>
  <v-app>
    <v-content>
      <VueCronEditorVuetify v-model="cronExpression"/>
      {{cronExpression}}
    </v-content>
  </v-app>
</template>

<script>
import VueCronEditorVuetify from 'vue-cron-editor-vuetify';

export default {
  name: 'App',
  components: {
    VueCronEditorVuetify
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
<VueCronEditorVuetify
    v-model="expression"
    locale="pl"
></VueCronEditorVuetify>
```
Currently supported languages:
- en
- pl

Custom locales can be provided via a ``customLocales`` prop:
```
<VueCronEditorVuetify
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
></VueCronEditorVuetify>
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
