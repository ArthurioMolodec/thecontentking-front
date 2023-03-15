import { isLoggedIn, logOut, storage } from '@/api';
import axios from '../api';

export const account = {
    state: {
        isLoggedIn: storage.isLoggedIn(),
        limits: {},
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        getAccountLimit: state => module => state.limits[module],
    },
    mutations: {
        UPDATE_IS_LOGGED_IN(state, val) {
            state.isLoggedIn = val;
        },
        UPDATE_LIMITS(state, val) {
            state.limits = { ...val };
        },
    },
    actions: {
        login(context, { email, password }) {
            return axios({ url: 'https://api.thecontentking.app/authapi', data: { email, pass: password, action: 'login' }, method: "POST" }).then(result => {
                if (!result.data || !result.data.status) {
                    return Promise.reject(result.data.errors);
                }

                storage.setToken(result.data.result.id_token);
                context.dispatch('setIsLoggedIn', true);

                return true;
            });
        },
        updateLimits(context) {
            return axios({ url: 'account-info-api' })
                .then(result => {
                    if (!result.data) {
                        return;
                    }

                    context.commit('UPDATE_LIMITS', result.data.limits);
                    context.commit('UPDATE_IS_LOGGED_IN', result.data.auth);
                    return true;
                });
        },
        apiRequestDone(context, { route, type = 'success', action = null }) {
            context.dispatch('updateLimits').then(() => {
                const limits = context.getters.getAccountLimit(route.name + 'Api');
                if (limits) {
                    let text = `${limits.leftCount} of ${limits.totalCount} left`;
                    if (limits.leftCount === 0) {
                        text += '<br/><b>Upgrade Account</b>';
                        action = 'price';
                    }
                    window.postMessage({ type: "Toast", data: { type: type, text: text, action } })
                }    
            });
        },
        registration(context, { email, password, pass_confirmation, first_name, last_name }) {
            return axios({ url: 'https://api.thecontentking.app/authapi', data: { email, pass: password, pass_confirmation, first_name, last_name, action: 'registration' }, method: "POST" }).then(result => {
                if (!result.data || !result.data.status) {
                    return Promise.reject(result.data.errors);
                }

                return true;
            });
        },
        setIsLoggedIn(context) {
            context.commit('UPDATE_IS_LOGGED_IN', isLoggedIn());
        }, 
        logout(context) {
            logOut();
            context.dispatch('setIsLoggedIn');
        },
    },
    modules: {
    }
}