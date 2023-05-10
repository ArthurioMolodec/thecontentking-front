<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import { defineComponent } from 'vue';
    import store from '@/store';

    export default defineComponent({
        name: 'App',
        data() {
            return {
                limitsTimer: null,
            };
        },
        methods: {
            processQueryToast() {
                const params = new Proxy(new URLSearchParams(window.location.search), {
                    get: (searchParams, prop) => searchParams.get(prop),
                });
                const toastmodule = params.toastmodule;
                if (!toastmodule) return;
                store.dispatch('apiRequestDone', { route: { name: toastmodule }, type: 'error' })
            }
        },
        created() {
            this.processQueryToast();
            store.dispatch('updateLimits');
            this.limitsTimer = setInterval(() => store.dispatch('updateLimits'), 20000);
        },
        computed: {
            isLoggedIn() {
                return store.getters.isLoggedIn;
            }
        },
        watch: {
            isLoggedIn() {
                store.dispatch('updateLimits');
            }
        },
        beforeUnmount() {
            if (this.limitsTimer) {
                clearInterval(this.limitsTimer);
            }

            this.limitsTimer = null;
        }
    });
</script>

<style scoped lang="scss">
::v-deep .v-application__wrap {
  position: unset;
}

.item {
    img, a {
        cursor: pointer;
    }
}
</style>