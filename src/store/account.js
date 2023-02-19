import { isLoggedIn, logOut, storage } from '@/api';
import axios from '../api';

export const account = {
  state: {
    isLoggedIn: false,
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    UPDATE_IS_LOGGED_IN(state, val) {
      state.isLoggedIn = val;
    },
  },
  actions: {
    login(context, { email, password }) {
      axios({ url: 'authapi', data: { email, pass: password, action: 'login' }, method: "POST" }).then(result => {
        if (!result.data || !result.data.status) {
          return;
        }

        storage.setToken(result.data.result.id_token);

        context.dispatch('setIsLoggedIn', true);
      });
    },
    registration(context, { email, password, pass_confirmation, first_name, last_name }) {
      axios({ url: 'authapi', data: { email, pass: password, pass_confirmation, first_name, last_name, action: 'registration' }, method: "POST" }).then(result => {
        if (!result.data || !result.data.status) {
          return;
        }
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