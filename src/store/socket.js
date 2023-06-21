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
                const socket = new WebSocket('ws://generate.kaizencloud.net:1111/queue/join');
                socket.onmessage = (message) => {
                    context.commit('SOCKET_ONMESSAGE', message);
                }
                context.commit('SOCKET_UPDATE', socket);
                
                socket.onopen = r;
            })
        },
    },
    mutations: {
        SOCKET_SET_MESSAGE_LISTENER(state, listener) {
            state.messageListener = listener;
        },
        SOCKET_UPDATE(state, socket) {
            state.socket = socket;
        },
        SOCKET_ONMESSAGE(state, message) {
            state.messageListener(JSON.parse(message.data));
        },
    },
    modules: {}
}