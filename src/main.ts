import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'; // Ensure this is installed and imported correctly
import BaseCard from './components/ui/BaseCard.vue';
import App from './App.vue';
import './style.css';

// Create a Pinia store instance
const pinia = createPinia();

// Use the Pinia persisted state plugin
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// Register global components
app.component('base-card', BaseCard);

// Use Pinia for state management
app.use(pinia);

// Mount the Vue app
app.mount('#app');
