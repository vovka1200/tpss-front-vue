import {defineStore} from "pinia";
import {ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";
import {Client} from "@/models/crm/clients";


export const useClientsStore = defineStore('clients', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Client[]>([]);
    const loading = ref(false);

    function load() {
        loading.value = true;
        websocket.send(
            "crm.clients.list",
            {
                filter: filter.value,
            },
            (msg) => {
                list.value = msg.result.clients;
                loading.value = false;
                return true
            },
            (msg) => {
                loading.value = false;
                return false
            }
        );
    }

    return {
        filter,
        list,
        load,
        loading,
    };
});