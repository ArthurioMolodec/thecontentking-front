import main from "../main";

import { io } from "socket.io-client";
const socketInstance = io('ws://invoke.kaizencloud.net:9090');

socketInstance.on("connect", () => {
    console.log("connected")
});

socketInstance.on("disconnect", () => {
    console.log("disconnected")
});

socketInstance.on("message", (message) => {
    console.log(message);
})


export const socket = {
    state: {
        socket: {
            messageListener: () => null,
        }
    },
    getters: {
        getMessageListener: state => state.messageListener,
    },
    actions: {
        messageReceived(context, message) {
            context.getters.getMessageListener(message);
        }
    },
    mutations: {
        SOCKET_SET_MESSAGE_LISTENER(state, listener) {
            state.messageListener = listener;
        },
    },
    modules: {}
};
