import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

import { bulmaConfig } from '@oruga-ui/theme-bulma'



import App from './App.vue'

createApp(App).use(Oruga).mount('#app');
