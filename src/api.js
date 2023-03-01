import axios from 'axios';
import store from './store/index';

const tkN = 'tk';

const abort = new AbortController();

export const authAbortSignal = abort.signal;

export const storage = {
    getToken() {
        return localStorage.getItem(tkN);
    },
    setToken(token) {
        localStorage.setItem(tkN, token)
    },
    removeToken() {
        localStorage.removeItem(tkN);
    },
    isLoggedIn() {
        return !!this.getToken();
    },
};

export const isLoggedIn = () => storage.isLoggedIn();
export const logOut = () => { storage.removeToken(); abort.abort(); };

function onFullfilled(response) {
    const authorization = response.data.token;
    if (authorization) {
        storage.setToken(authorization);
    }
    return response;
}

function onRejected(err) {
    if (err.response && err.response.status === 500) {
        // {data:err.response.data, url:err.response.config.url, method:err.response.config.method}
        // vuex.commit('INTERNAL_ERROR', true)
    }

    if (err.response && err.response.status === 409) {
        console.log('Back-end maintenance...');
    }

    if (err.response && err.response.status === 401) {
        store.dispatch('logout');
        // storage.removeToken();
        // router.push('/');
    }


    if (err.response && err.response.status === 402) {
        alert('402 error');
    }

    return Promise.reject(err.response);
}

function onRequestError(error) {
    return Promise.reject(error);
}


const privatePath = process.env.VUE_APP_API_PATH;

const configure = (axios) => {
    axios.defaults.baseURL = `${privatePath}`;
    axios.interceptors.request.use((config) => {
        if (storage.isLoggedIn()) {
            config.headers['Authorization'] = 'Bearer ' + storage.getToken();
        }
        if (!config.data) {
            config.data = {};
        }

        const bodyFormData = new FormData();

        for(const [k, v] of Object.entries(config.data)) {
            bodyFormData.append(k, v);
        }

        config.data = bodyFormData;


        return config;
    }, onRequestError);

    axios.interceptors.response.use(onFullfilled, onRejected);
    return axios;
};
export default configure(axios);