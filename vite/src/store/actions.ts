import {ActionContext} from "vuex";
import {State} from "./state";
import app from "../main";
import {JSONRPC, JSONRPCRequest} from "json-rpc-2.0";

export const login = function (context: ActionContext<State, State>) {
    if (context.state.socket.isConnected) {
        let jsonRPCRequest: JSONRPCRequest = {
            jsonrpc: JSONRPC,
            id: 1,
            method: "access.login",
            params: {
                "username": context.state.access.account.username,
                "password": context.state.access.account.password,
            }
        };
        app.config.globalProperties.$socket.sendObj(jsonRPCRequest);
        jsonRPCRequest = {
            jsonrpc: JSONRPC,
            id: 1,
            method: "version",
        };
        app.config.globalProperties.$socket.sendObj(jsonRPCRequest);
    }
};

export const loadUsers = function (context: ActionContext<State, State>, filter: string) {
    if (context.state.socket.isConnected) {
        let jsonRPCRequest: JSONRPCRequest = {
            jsonrpc: JSONRPC,
            id: 1,
            method: "access.users",
            params: {
                filter: filter,
            }
        };
        app.config.globalProperties.$socket.sendObj(jsonRPCRequest);
    }
};
