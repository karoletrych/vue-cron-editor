import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
import { VTabs, VTab, VTabItem, VCheckbox } from 'vuetify/lib'

new Vue({
    vuetify,
    components: {VTabs, VTab, VTabItem, VCheckbox},
  render: h => h(App)
}).$mount('#app')
