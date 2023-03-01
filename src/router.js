import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ContactUs from './views/ContactUs.vue'
import Generate from './views/tools/Generate.vue'
import Chat from './views/tools/Chat.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/contact-us',
        name: 'contact-us',
        component: ContactUs
    },
    {
        path: '/tools/generator',
        name: 'generate',
        component: Generate
    },
    {
        path: '/tools/chat',
        name: 'chat',
        component: Chat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router