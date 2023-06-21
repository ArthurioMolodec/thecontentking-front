import { createStore } from 'vuex';
import { account } from './account';
import { socket } from './socket';

const store = createStore({
    modules: {
        account,
        socket
    }
})

export default store;