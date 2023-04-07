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

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);

app.config.globalProperties.API_URL = process.env.VUE_APP_API_PATH;
app.config.globalProperties.CONTRACTS = {
    'BEP20': process.env.VUE_APP_NFT_MINTER_BEP20,
    // 'TRC20': process.env.VUE_APP_NFT_MINTER_TRC20,
};
app.config.globalProperties.TITLE = process.env.VUE_APP_TITLE
app.use(ToastPlugin);

window.addEventListener('message', (message) => {
    if (message.data && message.data.type !== 'Toast') return;
    const toast = app.config.globalProperties.$toast;
    if (!toast) return;
    if (message.data.data && message.data.data.type === 'success') {
        toast.success(message.data.data.text, { duration: 20000, position: 'top-left' });
    }
    if (message.data.data && message.data.data.type === 'error') {
        const config = {
            onClick: () => {},
        }
        if (message.data.data.action) {
            config.onClick = () => app.config.globalProperties.$router.push({ name: message.data.data.action });
        }
        toast.error(message.data.data.text, { duration: 20000, position: 'top-left', ...config });
    }
})

app.use(router).use(vuetify).use(VueWebpImage).mount('#app');