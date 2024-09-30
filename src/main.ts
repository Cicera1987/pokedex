import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import createI18nInstance from './i18n';

const app = createApp(App);

createI18nInstance().then(i18n => {
    app.use(i18n);
    app.use(router);
    app.mount('#app');
});