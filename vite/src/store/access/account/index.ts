import {defineStore} from "pinia";
import {useWebsocketStore} from "@/store/websocket";
import {computed, ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";
import {AccessMatrix, Method} from "@/models/access/maxrix";
import {useMainStore} from "@/store";
import {Notify} from "quasar";

export const useAccountStore = defineStore('account', () => {
    const websocket = useWebsocketStore();
    const mainStore = useMainStore();
    const id = ref('');
    const username = ref('');
    const password = ref('');
    const name = ref('');
    const accessMatrix = ref<AccessMatrix>([]);

    function login(): number | undefined {
        if (username.value && password.value) {
            return websocket.send(
                "access.users.user.login",
                {
                    username: username.value,
                    password: password.value,
                },
                onLogin,
            );
        }
    }

    function loginByToken(token: string): number | undefined {
        if (token != '') {
            return websocket.send(
                "access.users.user.login",
                {
                    token: token,
                },
                onLogin,
            );
        }
    }

    function onLogin(msg: JSONRPCResponse): boolean {
        if (msg.result?.account) {
            const account = msg.result?.account;
            id.value = account.id;
            username.value = account.username;
            name.value = account.name;
            websocket.setToken(msg.result?.token);
            websocket.authorized = true;
            mainStore.hideAuthorizationDialog();
            websocket.send('access.matrix');
        } else if (msg.error) {
            Notify.create({
                icon: 'error',
                color: 'negative',
                message: `API: Ошибка авторизации ${msg.error.code}`,
                caption: msg.error.message,
            });
        }
        return true;
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.matrix) {
            accessMatrix.value = msg.result?.matrix;
        }
    }

    function logout() {
        username.value = '';
        password.value = '';
        accessMatrix.value = [];
        websocket.authorized = false;
        websocket.resetToken();
        websocket.disconnect();
    }

    const allowed = computed(() => (objName: String, method: Method = Method.read) => {
        if (accessMatrix.value.length > 0) {
            return accessMatrix.value
                .findIndex(r => r.object === objName && r.access?.includes(method)) > -1;
        } else {
            return false;
        }
    });

    return {
        id,
        username,
        password,
        name,
        login,
        logout,
        allowed,
        loginByToken,
        onLoad,
    };
});