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
    if (state.socket.isConnected) {
        Notify.create({
            icon: 'info',
            color: 'warning',
            message: 'API: соединение закрыто',
        });
    }
    state.socket.isConnected = false;
    clearInterval(state.socket.heartBeatTimer);
    state.socket.heartBeatTimer = 0;
};

export const SOCKET_ONERROR = (state: State, event: Event) => {
    Notify.create({
        icon: 'error',
        color: 'negative',
        message: 'Ошибка подключения',
    });
};

export const SOCKET_RECONNECT = (state: State, count: number) => {
    Notify.create({
        icon: 'restart_alt',
        color: 'warning',
        message: `Попытка переподключения ${count}`,
    });
};

export const SOCKET_RECONNECT_ERROR = (state: State) => {
    state.socket.reconnectError = true;
    Notify.create({
        icon: 'close',
        color: 'negative',
        message: `Сервер недоступен`,
        timeout: 0,
    });
};

export const SET_AUTH_DIALOG_VISIBLE = (state: State, visible: boolean) => {
    state.authDialogVisible = visible;
};

export const SET_USERNAME = (state: State, value: string) => {
    state.access.account.username = value;
};

export const SET_PASSWORD = (state: State, value: string) => {
    state.access.account.password = value;
};

export const SET_ACCOUNT_NAME = (state: State, value: string) => {
    state.access.account.name = value;
};

export const SET_PANEL_TITLE = (state: State, value: string) => {
    state.panel = value;
};

export const SOCKET_ONMESSAGE = (state: State, message: JSONRPCResponse) => {
    state.socket.message = message;
    if (message.error) {
        if (message.error.code === 401) {
            if (state.authDialogVisible === false) {
                Notify.create({
                    icon: 'block',
                    color: 'negative',
                    message: 'Доступ ограничен',
                });
            }
            state.authDialogVisible = true;
        } else {
            Notify.create({
                icon: 'error',
                color: 'negative',
                message: `Ошибка ${message.error.code}`,
                caption: message.error.message,
            });
        }
        return;
    }

    if (message.result?.version) {
        state.apiVersion = message.result.version;
    }

    if (message.result?.account) {
        state.access.account.username = message.result.account.username;
        state.access.account.name = message.result.account.name;
    }

    if (message.result?.matrix) {
        state.access.matrix = message.result.matrix;
    }

    if (message.result?.users) {
        state.settings.access.users.list = message.result.users;
    }

    if (message.result?.groups) {
        state.settings.access.groups.list = message.result.groups;
    }
};