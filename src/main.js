import './assets/app.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { themeKey } from './constants';

const theme = localStorage.getItem(themeKey) || 'dark';
document.documentElement.dataset.theme = theme;

const app = createApp(App);

app.use(createPinia());

app.mount('#app');