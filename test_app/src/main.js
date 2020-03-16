import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
import { VTabs, VTab, VTabItem, VCheckbox, VSimpleCheckbox } from 'vuetify/lib'
import VueCronEditorVuetify from "vue-cron-editor-vuetify";
import VueCronEditorBuefy from "vue-cron-editor-buefy";
Vue.component("VueCronEditorVuetify", VueCronEditorVuetify);
Vue.component("VueCronEditorBuefy", VueCronEditorBuefy);


new Vue({
    vuetify,
    components: {VTabs, VTab, VTabItem, VCheckbox, VSimpleCheckbox},
  render: h => h(App)
}).$mount('#app')
