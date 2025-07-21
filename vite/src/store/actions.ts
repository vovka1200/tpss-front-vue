import {ActionContext} from "vuex";
import {State} from "./state";
import app from "../main";
import {JSONRPC, JSONRPCRequest} from "json-rpc-2.0";

function send(context: ActionContext<State, State>, req: JSONRPCRequest) {
    if (context.state.socket.isConnected) {
        app.config.globalProperties.$socket.sendObj(req);
    }
}

/**
 * Запрос на аутентификацию
 * @param {ActionContext<State, State>} context
 * @param {{ username: string, password: string }} payload
 */
export const login = function (context: ActionContext<State, State>, payload: { username: string, password: string }) {
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "access.users.user.login",
        params: payload,
    });
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "version",
    });
};

/**
 * Запрос загрузки списка пользователей по фильтру
 * @param {ActionContext<State, State>} context
 * @param {string} filter
 */
export const loadUsers = function (context: ActionContext<State, State>, filter: string) {
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "access.users.list",
        params: {
            filter: filter,
        }
    });
};

/**
 * Запрос загрузки списка групп по фильтру
 * @param {ActionContext<State, State>} context
 * @param {string} filter
 */
export const loadGroups = function (context: ActionContext<State, State>, filter: string) {
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "access.groups.list",
        params: {
            filter: filter,
        }
    });
};
