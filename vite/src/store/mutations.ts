import {State} from "./state";
import app from "../main";

export const SOCKET_ONOPEN = (state: State, event: Event) => {
    app.config.globalProperties.$socket = event.currentTarget;
    state.socket.isConnected = true;
    state.socket.heartBeatTimer = setInterval(() => {
        const message = 'keep alive';
        state.socket.isConnected &&
        app.config.globalProperties.$socket.sendObj({
            code: 200,
            msg: message
        });
    }, state.socket.heartBeatInterval);
};

export const SOCKET_ONCLOSE = (state: State, event: Event) => {
    state.socket.isConnected = false;
    // Stop the heartbeat message when the connection is closed
    clearInterval(state.socket.heartBeatTimer);
    state.socket.heartBeatTimer = 0;
    console.log("The line is disconnected: " + new Date());
    console.log(event);
};

export const SOCKET_ONERROR = (state: State, event: Event) => {
    console.error(state, event);
};

export const SOCKET_ONMESSAGE = (state: State, message: string) => {
    state.socket.message = message;
};

export const SOCKET_RECONNECT = (state: State, count: number) => {
    console.info("Message system reconnecting...", state, count);
};

export const SOCKET_RECONNECT_ERROR = (state: State) => {
    state.socket.reconnectError = true;
};