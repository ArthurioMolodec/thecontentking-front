export const socket = {
    state: {
        // 连接状态
        isConnected: false,
        // 消息内容
        message: "",
        // 重新连接错误
        reconnectError: false,
        // 心跳消息发送时间
        heartBeatInterval: 50000,
        // 心跳定时器
        heartBeatTimer: 0,
        socket: null,

        messageListener: (message) => null
    },
    getters: {
        getMessageListener: state => state.messageListener,
        getSocket: state => state.socket,
        getIsConnected: state => state.isConnected,
    },
    actions: {
        emitSocketMessage(context, message) {
            context.getters.getSocket.send(JSON.stringify(message));
        },
        connectSocket(context) {
            return new Promise((r) => {
                const socket = new WebSocket('wss://generate.kaizencloud.net/queue/join');
                socket.onmessage = (message) => {
                    context.dispatch('SOCKET_ONMESSAGE', message).then().catch(ex => { console.error(ex) });
                }
                context.commit('SOCKET_UPDATE', socket);
                
                socket.onopen = r;
            })
        },
        async SOCKET_ONMESSAGE(context, message) {
            return await context.getters.getMessageListener(JSON.parse(message.data));
        },
    },
    mutations: {
        SOCKET_SET_MESSAGE_LISTENER(state, listener) {
            state.messageListener = listener;
        },
        SOCKET_UPDATE(state, socket) {
            state.socket = socket;
        },
    },
    modules: {}
}