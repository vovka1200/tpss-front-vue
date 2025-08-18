import {defineStore} from "pinia";
import {useWebsocketStore} from "@/store/websocket";
import {computed, ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";
import {AccessMatrix, Method} from "@/models/access/maxrix";
import {useMainStore} from "@/store";
import {Notify} from "quasar";
import {User} from "@/models/access/users";

export const useAccountStore = defineStore('account', () => {
    const websocket = useWebsocketStore();
    const mainStore = useMainStore();
    const account = ref<User>(<User>{});
    const accessMatrix = ref<AccessMatrix>([]);

    function login(): number | undefined {
        if (account.value.username && account.value.password) {
            return websocket.send(
                "access.users.user.login",
                {
                    username: account.value.username,
                    password: account.value.password,
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
            account.value = msg.result?.account;
            accessMatrix.value = msg.result?.access_matrix;
            websocket.setToken(msg.result?.token);
            websocket.authorized = true;
            mainStore.hideAuthorizationDialog();
            Notify.create({
                icon: 'how_to_reg',
                color: 'positive',
                message: `Успешная аутентификация!`,
                caption: account.value.name,
            });
        } else if (msg.error) {
            if (msg.error.code === 401) {
                mainStore.authShake = true;
            } else {
                Notify.create({
                    icon: 'error',
                    color: 'negative',
                    message: `API: Ошибка авторизации ${msg.error.code}`,
                    caption: msg.error.message,
                });
            }
        }
        return true;
    }

    function logout() {
        account.value = <User>{};
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
        account,
        login,
        logout,
        allowed,
        loginByToken,
    };
});