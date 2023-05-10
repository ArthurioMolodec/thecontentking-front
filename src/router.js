import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Price from './views/Price.vue'
import Register from './views/Register.vue'
import ContactUs from './views/ContactUs.vue'
import Generate from './views/tools/Generate.vue'
import AdvancedMode from './views/tools/AdvancedMode.vue'
import AdvancedMode2 from './views/tools/AdvancedMode2.vue'
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
        children: [{
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
            name: 'ImageGenerator',
            component: Generate
        },
        {
            path: '/image-generator/advanced-mode',
            name: 'ImageGeneratorAdvancedMode',
            component: AdvancedMode
        },
        {
            path: '/image-generator/advanced-mode2',
            name: 'ImageGeneratorAdvancedMode2',
            component: AdvancedMode2
        },
        {
            path: '/tools/chat',
            name: 'Chat',
            component: Chat
        },
        {
            path: '/tools/nft',
            name: 'Nft',
            component: Nft
        },
        {
            path: '/tools/history',
            name: 'history',
            component: History
        },
        {
            path: '/tools/rewriter',
            name: 'Rewriter',
            component: Rewriter
        },
        {
            path: '/tools/article-writing',
            name: 'Article',
            component: ArticleWriting
        },
        {
            path: '/tools/answers',
            name: 'Answers',
            component: Answers
        },
        {
            path: '/tools/improve-text',
            name: 'Improve',
            component: ImproveText
        },
        {
            path: '/tools/summarize',
            name: 'Summarize',
            component: Summarize
        },
        {
            path: '/tools/long-from-writer',
            name: 'Writer',
            component: LongFromWriter
        },
        {
            path: '/tools/media-text-content',
            name: 'Content',
            component: MediaTextContent
        },
        {
            path: '/tools/biography-writer',
            name: 'Biography',
            component: BiographyWriter
        }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router