import {defineStore} from 'pinia';
import app from '@/main';
import {Notify} from "quasar";
import {JSONRPCRequest, JSONRPCResponse} from "json-rpc-2.0";
import {ref} from "vue";
import {useMainStore} from "@/store";
import {useAccountStore} from "@/store/access/account";
import {useUsersStore} from "@/store/access/users";
import {useGroupsStore} from "@/store/access/groups";
import {useClientsStore} from "@/store/crm/clients";
import {useRulesStore} from "@/store/access/rules";

export const useWebsocketStore = defineStore('websocket', () => {
    const mainStore = useMainStore();
    const accountStore = useAccountStore();
    const usersStore = useUsersStore();
    const groupsStore = useGroupsStore();
    const clientsStore = useClientsStore();
    const rulesStore = useRulesStore();
    const isConnected = ref(false);
    const message = ref<JSONRPCResponse>(<JSONRPCResponse>{});
    const reconnectError = ref(false);
    const heartBeatInterval = ref(50000);
    const heartBeatTimer = ref(0);

    /**
     * Действие на открытие соединения
     * @param {Event} event
     */
    function SOCKET_ONOPEN(event: Event) {
        app.config.globalProperties.$socket = event.currentTarget;
        isConnected.value = true;
    }

    /**
     * Действие на закрытие соединения
     */
    function SOCKET_ONCLOSE() {
        if (isConnected.value) {
            Notify.create({
                icon: 'info',
                color: 'warning',
                message: 'API: соединение закрыто',
            });
        }
        isConnected.value = false;
        clearInterval(heartBeatTimer.value);
        heartBeatTimer.value = 0;
    }

    /**
     * Действие по ошибке подключения
     */
    function SOCKET_ONERROR() {
        Notify.create({
            icon: 'error',
            color: 'negative',
            message: 'API: Ошибка подключения',
        });
    }

    /**
     * Действие по попытке переподключения
     * @param {number} count
     */
    function SOCKET_RECONNECT(count: number) {
        Notify.create({
            icon: 'restart_alt',
            color: 'warning',
            message: `API: Попытка переподключения ${count}`,
        });
    }

    /**
     * Действие по ошибке переподключения
     */
    function SOCKET_RECONNECT_ERROR() {
        reconnectError.value = true;
        Notify.create({
            icon: 'close',
            color: 'negative',
            message: `API: Сервер недоступен`,
            timeout: 0,
        });
    }

    /**
     * Посылает запрос
     * @param {JSONRPCRequest} req
     */
    function send(req: JSONRPCRequest) {
        if (isConnected.value) {
            app.config.globalProperties.$socket.sendObj(req);
        }
    }

    /**
     * Действие по сообщению
     * @param {JSONRPCResponse} msg
     */
    function SOCKET_ONMESSAGE(msg: JSONRPCResponse) {
        message.value = msg;
        const error = message.value.error;
        if (error) {
            if (error.code === 401) {
                if (accountStore.token != '') {
                    accountStore.login();
                } else {
                    if (!mainStore.authDialogVisible) {
                        Notify.create({
                            icon: 'block',
                            color: 'negative',
                            message: 'API: Доступ ограничен',
                        });
                    }
                    mainStore.showAuthorizationDialog();
                }
            } else {
                Notify.create({
                    icon: 'error',
                    color: 'negative',
                    message: `API: Ошибка ${error.code}`,
                    caption: error.message,
                });
            }
            return;
        } else {
            accountStore.onLoad(msg);
            usersStore.onLoad(msg);
            groupsStore.onLoad(msg);
            clientsStore.onLoad(msg);
            rulesStore.onLoad(msg);
        }
    }

    return {
        isConnected,
        message,
        reconnectError,
        heartBeatInterval,
        heartBeatTimer,
        SOCKET_ONOPEN,
        SOCKET_ONCLOSE,
        SOCKET_ONERROR,
        SOCKET_RECONNECT,
        SOCKET_RECONNECT_ERROR,
        SOCKET_ONMESSAGE,
        send,
    };
});
