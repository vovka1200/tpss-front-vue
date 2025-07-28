import {defineStore} from "pinia";
import {useWebsocketStore} from "@/store/websocket";
import {ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";
import {AccessMatrix, Method} from "@/models/access/maxrix";
import {useMainStore} from "@/store";

export const useAccountStore = defineStore('account', () => {
    const websocket = useWebsocketStore();
    const mainStore = useMainStore();
    const id = ref('');
    const username = ref('');
    const password = ref('');
    const name = ref('');
    const matrix = ref<AccessMatrix>([]);

    function login(): number | undefined {
        if (username.value && password.value) {
            return websocket.send(
                "access.users.user.login",
                {
                    username: username.value,
                    password: password.value,
                },
            );
        }
    }

    function loginByToken(token: string): number | undefined {
        if (token != '') {
            return websocket.send(
                "access.users.user.login",
                {
                    token: token,
                }
            );
        }
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.account) {
            const account = msg.result?.account;
            id.value = account.id;
            username.value = account.username;
            name.value = account.name;
            websocket.setToken(msg.result?.token);
            matrix.value = msg.result?.matrix;
            mainStore.hideAuthorizationDialog();
        }
        if (msg.result?.version) {
            mainStore.apiVersion = msg.result?.version;
        }
    }

    function logout() {
        username.value = '';
        password.value = '';
        matrix.value = [];
        websocket.resetToken();
        websocket.disconnect();
    }

    function allowed(objectName: String, method: Method = Method.read) {
        if (matrix.value.length > 0) {
            return matrix.value
                .findIndex(r => r.object === objectName && r.access?.includes(method)) > -1;
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
        loginByToken,
    };
});