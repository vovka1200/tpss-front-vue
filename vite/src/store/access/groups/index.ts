import {defineStore} from "pinia";
import {ref} from "vue";
import {Group} from "@/models/access/groups";
import {JSONRPC, JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";


export const useGroupsStore = defineStore('groups', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Group[]>([]);

    function load() {
        websocket.send(
            "access.groups.list",
            {
                filter: filter.value,
            }
        );
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.groups) {
            list.value = msg.result?.groups;
        }
    }

    return {
        filter,
        list,
        load,
        onLoad,
    };
});