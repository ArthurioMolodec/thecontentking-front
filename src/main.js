import { createApp } from 'vue'
import '@/assets/css/main.scss';
import App from './App.vue'
import router from './router'
import VueWebpImage from 'vue-webp-image';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

app.config.globalProperties.API_URL = process.env.VUE_APP_API_PATH;

app.use(router).use(vuetify).use(VueWebpImage).mount('#app');