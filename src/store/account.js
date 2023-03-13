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
                    return;
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
                    return true;
                });
        },
        registration(context, { email, password, pass_confirmation, first_name, last_name }) {
            return axios({ url: 'authapi', data: { email, pass: password, pass_confirmation, first_name, last_name, action: 'registration' }, method: "POST" }).then(result => {
                if (!result.data || !result.data.status) {
                    return;
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