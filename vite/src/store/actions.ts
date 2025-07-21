import {ActionContext} from "vuex";
import {State} from "./state";
import app from "../main";
import {JSONRPC, JSONRPCRequest} from "json-rpc-2.0";

function send(context: ActionContext<State, State>, req: JSONRPCRequest) {
    if (context.state.socket.isConnected) {
        app.config.globalProperties.$socket.sendObj(req);
    }
}

export const login = function (context: ActionContext<State, State>) {
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "access.users.user.login",
        params: {
            "username": context.state.access.account.username,
            "password": context.state.access.account.password,
        }
    });
    send(context, {
        jsonrpc: JSONRPC,
        id: 1,
        method: "version",
    });
};

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
