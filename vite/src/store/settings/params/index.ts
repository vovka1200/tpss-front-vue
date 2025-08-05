import {defineStore} from "pinia";
import {ref} from "vue";
import {JSONRPCResponse} from "json-rpc-2.0";
import {useWebsocketStore} from "@/store/websocket";
import {Param} from "@/models/params";


export const useParamsStore = defineStore('params', () => {
    const websocket = useWebsocketStore();
    const filter = ref('');
    const list = ref<Param[]>([]);
    const loading = ref(false);
    const item = ref<Param>(<Param>{name: '', type: ''});

    function load() {
        loading.value = true;
        websocket.send(
            "settings.params.list",
            {
                filter: filter.value,
            });
    }

    function onLoad(msg: JSONRPCResponse) {
        if (msg.result?.params) {
            list.value = msg.result?.params;
            loading.value = false;
        }
    }

    return {
        filter,
        list,
        load,
        onLoad,
        loading,
        item,
    };
});