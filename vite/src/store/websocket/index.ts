import {defineStore} from 'pinia';
import app from '@/main';
import {Notify, Loading} from "quasar";
import {JSONRPC, JSONRPCError, JSONRPCErrorResponse, JSONRPCRequest, JSONRPCResponse} from "json-rpc-2.0";
import {ref} from "vue";
import moment from "moment/moment";
import {useMainStore} from "@/store";
import {useAccountStore} from "@/store/access/account";
import {useRulesStore} from "@/store/access/rules";
import {useParamsStore} from "@/store/settings/params";

type resultHandler = (msg: JSONRPCResponse) => boolean;
type errorHandler = (msg: JSONRPCErrorResponse) => boolean;

export const useWebsocketStore = defineStore('websocket', () => {
    const mainStore = useMainStore();
    const accountStore = useAccountStore();
    const rulesStore = useRulesStore();
    const paramsStore = useParamsStore();
    const isConnected = ref(false);
    const reconnecting = ref(false);
    const message = ref<JSONRPCResponse>(<JSONRPCResponse>{});
    const reconnectError = ref(false);
    const heartBeatInterval = ref(50000);
    const heartBeatTimer = ref(0);
    const requestId = ref(1);
    const authorized = ref(false);
    const resultHandlers = new Map<number, resultHandler>();
    const errorHandlers = new Map<number, errorHandler>();

    /**
     * Действие на открытие соединения
     * @param {Event} event
     */
    function SOCKET_ONOPEN(event: Event) {
        Loading.hide('websocket');
        app.config.globalProperties.$socket = event.currentTarget;
        isConnected.value = true;
        send('version');
        if (reconnecting.value) {
            Notify.create({
                icon: 'restart_alt',
                color: 'positive',
                message: `API: Подключение успешно`,
            });
            reconnecting.value = false;
        }
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
        reconnecting.value = true;
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
     * Вызывает метод с параметрами
     * @param {string} method
     * @param {any} params
     * @param {resultHandler} onLoad
     * @returns number | undefined
     */
    function send(method: string, params?: any, onLoad?: resultHandler, onError?: errorHandler): number | undefined {
        if (isConnected.value) {
            const id = requestId.value++;
            const req: JSONRPCRequest = {
                jsonrpc: JSONRPC,
                id: id,
                method: method,
                params: params || {},
            };
            // Регистрация обработчика результата
            if (typeof onLoad === 'function') {
                resultHandlers.set(id, onLoad);
            }
            // Регистрация обработчика ошибки
            if (typeof onError === 'function') {
                errorHandlers.set(id, onError);
            }
            app.config.globalProperties.$socket.sendObj(req);
            return id;
        }
    }

    /**
     * Закрывает соединение
     */
    function disconnect() {
        Loading.show({group: 'websocket'});
        app.config.globalProperties.$socket.close();
    }

    /**
     * Действие по сообщению
     * @param {JSONRPCResponse} msg
     */
    function SOCKET_ONMESSAGE(msg: JSONRPCResponse) {
        message.value = msg;
        const error = msg.error;
        const result = msg.result;
        // Если получен результат
        if (result) {
            // Если для id сообщения зарегистрирован обработчик, то выполняем его
            if (msg.id && resultHandlers.has(<number>(msg.id))) {
                const exit = resultHandlers.get(<number>(msg.id))?.call(msg, msg);
                resultHandlers.delete(<number>msg.id)
                // Если обработчик вернул true, прекращаем дальнейшую обработку
                if (exit) {
                    return;
                }
            }
            mainStore.onLoad(msg);
            rulesStore.onLoad(msg);
            paramsStore.onLoad(msg);
        }
        // Если получена ошибка
        else if (error) {
            // Если для id ошибки зарегистрирован обработчик, то выполняем его
            if (msg.id && msg.error && errorHandlers.has(<number>(msg.id))) {
                const exit = errorHandlers.get(<number>(msg.id))?.call(msg, msg);
                resultHandlers.delete(<number>msg.id)
                // Если обработчик вернул true, прекращаем дальнейшую обработку
                if (exit) {
                    return;
                }
            }
            switch (error.code) {
                case 401:
                    const token = getToken();
                    if (msg.id === null) {
                        if (token != '') {
                            resetToken();
                            accountStore.loginByToken(token);
                        } else {
                            mainStore.showAuthorizationDialog();
                        }
                    } else {
                        if (token != '') {
                            resetToken();
                            mainStore.showAuthorizationDialog();
                        } else {
                            mainStore.shakeAuthorizationDialog();
                        }
                    }
                    break;
                default:
                    Notify.create({
                        icon: 'error',
                        color: 'negative',
                        message: `API: Ошибка ${error.code}`,
                        caption: error.message,
                    });
            }
        } else {
            Notify.create({
                icon: 'error',
                color: 'negative',
                message: `API: Ошибка связи`,
                caption: 'Данные отсутствуют',
            });
        }
    }


    function getToken() {
        const until = localStorage.getItem('token_live_until');
        if (!until || moment().isAfter(until)) {
            resetToken();
            return '';
        }
        return localStorage.getItem('token') ?? '';
    }

    function setToken(newToken: string) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('token_live_until', moment().add(1, 'day').toISOString());
    }

    function resetToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('token_live_until');
    }

    return {
        isConnected,
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
        disconnect,
        authorized,
        setToken,
        resetToken,
    };
});
