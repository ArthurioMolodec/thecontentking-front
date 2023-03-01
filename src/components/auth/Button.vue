<template>
    <v-btn class="button">
        <span class="btn-login">{{name}}</span>
    </v-btn>
</template>

<script>
    export default {
        props: ['name'],
        data() {
            return {
              color: '#D1A658'
            };
        },
    };
</script>

<style scoped>
   .button {
       color: #242424;
       background: #D1A658;
       border-radius: 12px;
       width: 100%;
       font-size: 16px;
       min-height: 50px;
       text-transform: none;
   }

    .btn-login {
        padding: 15.5px 0;
    }
</style>


