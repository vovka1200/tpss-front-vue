import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {User} from "@/models/access/users";
import {JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";


export const useUsersStore = defineStore('users', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<User[]>([]);
    const item = ref<User>(<User>{});
    const loading = ref(false);

    const get = computed(() => (id: string) => list.value.find(u => u.id === id));

    function load(id?: string | string[] | undefined) {
        if (loading.value === false) {
            loading.value = true;
            websocket.send(
                "access.users.list",
                {
                    id: id || null,
                    filter: filter.value,
                }
            );
        }
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.users) {
            list.value = msg.result?.users;
            item.value = list.value[0];
            loading.value = false;
        }
    }

    return {
        filter,
        list,
        item,
        load,
        onLoad,
        get,
    };
});