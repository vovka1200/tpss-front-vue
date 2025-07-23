import {defineStore} from "pinia";
import {useWebsocketStore} from "@/store/websocket";
import {ref} from "vue";
import {JSONRPC, JSONRPCResponse} from "json-rpc-2.0";
import {AccessMatrix, Method} from "@/models/access/maxrix";
import {useMainStore} from "@/store";


export const useAccountStore = defineStore('account', () => {
    const websocket = useWebsocketStore();
    const mainStore = useMainStore();
    const id = ref('');
    const username = ref('');
    const password = ref('');
    const name = ref('');
    const token = ref('');
    const matrix = ref<AccessMatrix>([]);

    function login() {
        const tmpToken: string = token.value;
        token.value = '';
        websocket.send({
            jsonrpc: JSONRPC,
            id: 1,
            method: "access.users.user.login",
            params: tmpToken != '' ? {
                token: tmpToken,
            } : {
                username: username.value,
                password: password.value,
            },
        });
        websocket.send({
            jsonrpc: JSONRPC,
            id: 1,
            method: "version",
        });
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.account) {
            const account = msg.result?.account;
            id.value = account.id;
            username.value = account.username;
            name.value = account.name;
            token.value = msg.result?.token;
            matrix.value = msg.result?.matrix;
            mainStore.hideAuthorizationDialog();
        }
        if (msg.result?.version) {
            mainStore.apiVersion = msg.result?.version;
        }
    }

    function logout() {

    }

    function allowed(objectName: String, method: Method = Method.read) {
        if (matrix.value.length > 0) {
            return matrix.value
                .findIndex(r => r.object === objectName && r.methods?.includes(method)) > -1;
        } else {
            return false;
        }
    }

    return {
        id,
        username,
        password,
        name,
        login,
        logout,
        allowed,
        onLoad,
        token,
    };
});