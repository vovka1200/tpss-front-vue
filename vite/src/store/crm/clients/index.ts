import {defineStore} from "pinia";
import {ref} from "vue";
import {JSONRPC, JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";
import {Client} from "@/models/crm/clients";


export const useClientsStore = defineStore('clients', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Client[]>([]);

    function load() {
        websocket.send(
            "crm.clients.list",
            {
                filter: filter.value,
            });
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.clients) {
            list.value = msg.result?.clients;
        }
    }

    return {
        filter,
        list,
        load,
        onLoad,
    };
});