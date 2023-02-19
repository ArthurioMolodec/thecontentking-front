<template>
    <p class="have-account">
        Or sign up using
    </p>
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
        margin-top: 71px;
        margin-bottom: 22px;
        text-align: center;
        color: #ffffff;
        font-size: 16px;
        font-weight: 400;
    }
</style>


