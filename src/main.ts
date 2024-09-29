import { createApp } from 'vue';
import { createPinia } from 'pinia';
import BaseCard from './components/ui/BaseCard.vue';

import App from './App.vue';
import './style.css'

const pinia = createPinia();
const app = createApp(App);

app.component('base-card', BaseCard);

app.use(pinia);
app.mount('#app');