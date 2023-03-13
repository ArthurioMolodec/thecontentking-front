import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Price from './views/Price.vue'
import Register from './views/Register.vue'
import ContactUs from './views/ContactUs.vue'
import Generate from './views/tools/Generate.vue'
import Chat from './views/tools/Chat.vue'
import Nft from './views/tools/Nft.vue'
import History from './views/tools/History.vue'
import Rewriter from './views/tools/Rewriter.vue'
import ArticleWriting from './views/tools/ArticleWriting.vue'
import Answers from './views/tools/Answers.vue'
import ImproveText from './views/tools/ImproveText.vue'
import Summarize from './views/tools/Summarize.vue'
import LongFromWriter from './views/tools/LongFromWriter.vue'
import MediaTextContent from './views/tools/MediaTextContent.vue'
import BiographyWriter from './views/tools/BiographyWriter.vue'
import AboutUs from './views/AboutUs.vue'
import PrivacyPolicy from './views/PrivacyPolicy.vue'

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
        path: '/pricing',
        name: 'price',
        component: Price
    },
    {
        path: '/about-us',
        name: 'about-us',
        component: AboutUs
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: PrivacyPolicy
    },
    {
        path: '/image-generator',
        name: 'generate',
        component: Generate
    },
    {
        path: '/tools/chat',
        name: 'chat',
        component: Chat
    },
    {
        path: '/tools/nft',
        name: 'nft',
        component: Nft
    },
    {
        path: '/tools/history',
        name: 'history',
        component: History
    },
    {
        path: '/tools/rewriter',
        name: 'rewriter',
        component: Rewriter
    },
    {
        path: '/tools/article-writing',
        name: 'article-writing',
        component: ArticleWriting
    },
    {
        path: '/tools/answers',
        name: 'answers',
        component: Answers
    },
    {
        path: '/tools/improve-text',
        name: 'improve-text',
        component: ImproveText
    },
    {
        path: '/tools/summarize',
        name: 'summarize',
        component: Summarize
    },
    {
        path: '/tools/long-from-writer',
        name: 'long-from-writer',
        component: LongFromWriter
    },
    {
        path: '/tools/media-text-content',
        name: 'media-text-content',
        component: MediaTextContent
    },
    {
        path: '/tools/biography-writer',
        name: 'biography-writer',
        component: BiographyWriter
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router