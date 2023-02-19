import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ContactUs from './views/ContactUs.vue'

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router