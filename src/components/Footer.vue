<template>
    <v-footer class="footer">
        <v-row justify="center" no-gutters>
            <router-link
                v-for="link in links"
                :key="link"
                color="white"
                variant="text"
                class="item"
                :to="link.path">
                {{ link.title }}
            </router-link>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            links: [
                {
                    title: 'Home',
                    path: '/'
                },
                {
                    title: 'About Us',
                    path: '/about-us'
                },
                {
                    title: 'Contact',
                    path: '/contact-us'
                },
                {
                    title: 'Pricing',
                    path: '/pricing'
                },
                {
                    title: 'Tools',
                    path: '/tools/generator'
                },
                {
                    title: 'Privacy Policy',
                    path: '/privacy-policy'
                }
            ],
        }),
    }
</script>

<style lang="scss" scoped>
    footer {
        background: #1E1E1E;
        margin-top: 265px;
        width: 100%;
        height: 90px;

        @media (max-width: 750px) {
            height: auto;
            padding: 20px 0;
            margin-top: 100px;
        }
    }

    .item {
        color: #ffffff;
        border-right: 1px solid #ffffff;
        padding: 5px 30px;
        text-align: center;
        font-size: 14px;
        text-decoration: none;
        &:hover {text-decoration: underline;}

        @media (max-width: 750px) {
            border-right: none;
            padding: 5px 10px;
        }
    }

    .item:last-child {
        border-right: 0;
    }
</style>