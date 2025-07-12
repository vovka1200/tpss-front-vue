import {State} from './state'
import app from '../main'
import {JSONRPC, JSONRPCRequest, JSONRPCResponse} from 'json-rpc-2.0'
import {Notify} from 'quasar';

export const SOCKET_ONOPEN = (state: State, event: Event) => {
    app.config.globalProperties.$socket = event.currentTarget;
    state.socket.isConnected = true;

    function getVersion() {
        const jsonRPCRequest: JSONRPCRequest = {
            jsonrpc: JSONRPC,
            id: 1,
            method: "version",
        };
        if (state.socket.isConnected) {
            app.config.globalProperties.$socket.sendObj(jsonRPCRequest);
        }
    }

    getVersion();
    state.socket.heartBeatTimer = setInterval(() => {
        getVersion();
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

export const SOCKET_RECONNECT = (state: State, count: number) => {
    console.info("Message system reconnecting...", state, count);
};

export const SOCKET_RECONNECT_ERROR = (state: State) => {
    state.socket.reconnectError = true;
};

export const SET_AUTH_DIALOG_VISIBLE = (state: State, visible: boolean) => {
    state.authDialogVisible = visible;
};

export const SET_USERNAME = (state: State, value: string) => {
    state.access.username = value;
};

export const SET_PASSWORD = (state: State, value: string) => {
    state.access.password = value;
};

export const SOCKET_ONMESSAGE = (state: State, message: JSONRPCResponse) => {
    console.log(message);
    state.socket.message = message;
    if (message.error?.code === 401) {
        if (state.authDialogVisible === false) {
            Notify.create({
                icon: 'info',
                color: 'negative',
                message: 'Access denied!',
            });
        }
        state.authDialogVisible = true;
    }
    if (message.result?.version) {
        state.apiVersion = message.result?.version
    }
};