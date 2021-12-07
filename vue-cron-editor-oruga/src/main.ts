import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next';
import '@oruga-ui/oruga-next/dist/oruga.css';

import App from './App.vue'

createApp(App).use(Oruga).mount('#app');
