<template>
    <router-link to="/register" class="have-account">
        Or sign up using
    </router-link>
    <div class="d-flex justify-center align-center">
        <img :src="require(`@/assets/icons/${icon}.svg`)" width="20.42" class="mr-31"  v-for="icon in icons"
             :key="icon">
    </div>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                'google',
                'facebook',
                'apple',
                'instagram',
                'twitter',
            ],
        }),
    }
</script>

<style scoped>
    .mr-31:not(:last-child) {
        margin-right: 31px;
    }

    .have-account {
        text-decoration: none;
        margin-top: 71px;
        margin-bottom: 22px;
        text-align: center;
        display: block;
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
    }
</style>


