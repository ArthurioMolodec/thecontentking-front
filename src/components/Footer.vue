<template>
    <v-footer class="footer">
        <v-row justify="center" no-gutters>
            <v-btn
                    v-for="link in links"
                    :key="link"
                    color="white"
                    variant="text"
                    class="item"
                    rounded="0"
            >
                {{ link }}
            </v-btn>
        </v-row>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            links: [
                'Home',
                'About Us',
                'Contact',
                'Pricing',
                'Tools',
                'Privacy Policy',
            ],
        }),
    }
</script>

<style scoped>

    footer {
        background-color: #1E1E1E;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 90px;
    }

    .item {
        color: #ffffff;
        border-right: 1px solid #ffffff;
        padding: 0 30px;
        text-align: center;
        font-size: 14px;
    }

    .item:last-child {
        border-right: 0;
    }
</style>