<template>
    <v-app-bar
            dense
            flat
            color="#242424"
    >
        <img src="../assets/logo.svg" width="267" height="40">
        <v-divider inset vertical />
        <v-spacer />

        <router-link
                v-for="item in menuItems"
                :key="item"
                color="white"
                variant="text"
                :to="item.path"
                :class="{ 'active-link': $route.path === item.path }"
                class="item"
                rounded="0"
        >
            {{ item.title }}
        </router-link>
        <router-link to="/register" rounded="xl" text v-text="'Sign In'" class="sign-up"></router-link>
        <router-link to="/login" rounded="xl" text v-text="'Login'" class="login"></router-link>
    </v-app-bar>
</template>

<script>
    //import HelloWorld from "./components/HelloWorld";

    export default {
        name: "Header",
        data(){
            return {
                sidebar: false,
                menuItems: [
                    { title: 'Tools', path: '#'},
                    { title: 'About us', path: '#'},
                    { title: 'Contact us', path: '/contact-us'},
                    { title: 'Pricing', path: '#'},
                ]
            }
        },
    };
</script>

<style scoped type="scss">
    header {
        padding: 20px 146px 0 151px !important;
        background: url("../assets/header-gradient.svg") rgb(36 36 36 / 0%) !important;
    }
    .item {
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        text-transform: none;
        text-decoration: none;
        margin-right: 30px;
        padding-bottom: 10px;
        margin-top: 10px;
    }

    .item:hover {
        background-color: transparent;
        color: #D1A658;
    }

    .active-link {
        border-bottom: 2px solid #D1A658;
    }

    .sign-up {
        padding: 13px 23px 13px 23px;
        min-height: 45px;
        background-color: #D1A658;
        text-transform: none;
        font-size: 16px;
        color: #242424;
        margin-left: 10px;
        text-decoration: none;
        border-radius: 71px;
    }

    .login {
        padding: 13px 23px 13px 23px;
        min-height: 45px;
        text-decoration: none;
        border-radius: 71px;
        background-color: #2F2F2F;
        text-transform: none;
        font-size: 16px;
        color: #ffffff;
        margin-left: 10px;
    }
</style>
