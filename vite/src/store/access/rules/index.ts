import {defineStore} from "pinia";
import {ref} from "vue";
import {JSONRPC, JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";
import {AccessMatrix} from "@/models/access/maxrix";


export const useRulesStore = defineStore('rules', () => {
    const websocket = useWebsocketStore();
    const list = ref<AccessMatrix>([]);

    function load(id: string | undefined) {
        websocket.send(
            "access.groups.group.rules.list",
            {
                group_id: id,
            }
        );
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.rules) {
            list.value = msg.result?.rules;
        }
    }

    return {
        list,
        load,
        onLoad,
    };
});