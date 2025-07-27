import {defineStore} from "pinia";
import {ref} from "vue";
import {User} from "@/models/access/users";
import {JSONRPC, JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";


export const useUsersStore = defineStore('users', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<User[]>([]);

    function load() {
        websocket.send(
            "access.users.list",
            {
                filter: filter.value,
            });
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.users) {
            list.value = msg.result?.users;
        }
    }

    return {
        filter,
        list,
        load,
        onLoad,
    };
});